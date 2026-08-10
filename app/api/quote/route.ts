import { NextRequest, NextResponse } from "next/server";
import { validateQuote } from "@/lib/validation";
import { sendNotificationEmail } from "@/lib/mailer";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const data = {
      fullName: String(form.get("fullName") || ""),
      companyName: String(form.get("companyName") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      country: String(form.get("country") || ""),
      service: String(form.get("service") || ""),
      projectType: String(form.get("projectType") || ""),
      estimatedBudget: String(form.get("estimatedBudget") || ""),
      projectLocation: String(form.get("projectLocation") || ""),
      requiredDate: String(form.get("requiredDate") || ""),
      projectDescription: String(form.get("projectDescription") || "")
    };

    const errors = validateQuote(data, {
      required: "This field is required",
      email: "Invalid email",
      phone: "Invalid phone"
    });
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const attachment = form.get("attachment");
    let attachmentNote = "No attachment";
    if (attachment instanceof File && attachment.size > 0) {
      if (attachment.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { ok: false, errors: { attachment: "File exceeds 10MB limit" } },
          { status: 400 }
        );
      }
      attachmentNote = `${attachment.name} (${Math.round(attachment.size / 1024)} KB) — file received; wire to storage/CRM in production.`;
    }

    const html = `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.fullName)}</p>
      <p><strong>Company:</strong> ${escapeHtml(data.companyName || "—")}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>Country:</strong> ${escapeHtml(data.country || "—")}</p>
      <p><strong>Service:</strong> ${escapeHtml(data.service || "—")}</p>
      <p><strong>Project Type:</strong> ${escapeHtml(data.projectType || "—")}</p>
      <p><strong>Estimated Budget:</strong> ${escapeHtml(data.estimatedBudget || "—")}</p>
      <p><strong>Project Location:</strong> ${escapeHtml(data.projectLocation || "—")}</p>
      <p><strong>Required Date:</strong> ${escapeHtml(data.requiredDate || "—")}</p>
      <p><strong>Description:</strong></p>
      <p>${escapeHtml(data.projectDescription).replace(/\n/g, "<br/>")}</p>
      <p><strong>Attachment:</strong> ${escapeHtml(attachmentNote)}</p>
    `;

    await sendNotificationEmail({
      subject: `Quote Request from ${data.fullName}`,
      html,
      replyTo: data.email
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Quote form error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
