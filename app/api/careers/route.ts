import { NextRequest, NextResponse } from "next/server";
import { validateCareer } from "@/lib/validation";
import { sendNotificationEmail } from "@/lib/mailer";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const data = {
      fullName: String(form.get("fullName") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      position: String(form.get("position") || ""),
      coverNote: String(form.get("coverNote") || "")
    };

    const errors = validateCareer(data, {
      required: "This field is required",
      email: "Invalid email",
      phone: "Invalid phone"
    });
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const cv = form.get("cv");
    let cvNote = "No CV attached";
    if (cv instanceof File && cv.size > 0) {
      if (cv.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { ok: false, errors: { cv: "File exceeds 10MB limit" } },
          { status: 400 }
        );
      }
      cvNote = `${cv.name} (${Math.round(cv.size / 1024)} KB) — file received; wire to storage/ATS in production.`;
    }

    const html = `
      <h2>New Career Application</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>Position:</strong> ${escapeHtml(data.position || "General Application")}</p>
      <p><strong>Cover Note:</strong></p>
      <p>${escapeHtml(data.coverNote || "—").replace(/\n/g, "<br/>")}</p>
      <p><strong>CV:</strong> ${escapeHtml(cvNote)}</p>
    `;

    await sendNotificationEmail({
      subject: `Career Application: ${data.fullName}`,
      html,
      replyTo: data.email
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Career form error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
