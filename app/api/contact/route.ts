import { NextRequest, NextResponse } from "next/server";
import { validateContact } from "@/lib/validation";
import { sendNotificationEmail } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const errors = validateContact(data, {
      required: "This field is required",
      email: "Invalid email",
      phone: "Invalid phone"
    });
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // Basic honeypot / spam guard: reject if a hidden field was filled.
    if (data.website) {
      return NextResponse.json({ ok: true });
    }

    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.fullName)}</p>
      <p><strong>Company:</strong> ${escapeHtml(data.companyName || "—")}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>Service:</strong> ${escapeHtml(data.serviceRequired || "—")}</p>
      <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>
    `;

    await sendNotificationEmail({
      subject: `Website Contact: ${data.subject}`,
      html,
      replyTo: data.email
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
