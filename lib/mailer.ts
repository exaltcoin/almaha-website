import nodemailer from "nodemailer";
import { company } from "@/data/company";

/**
 * Sends notification emails via SMTP using environment-configured credentials.
 * If SMTP is not configured (e.g. local development without a .env file),
 * this logs the submission to the console instead of throwing, so forms
 * remain testable without a mail account.
 *
 * Required environment variables (see .env.example):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM
 *   NOTIFY_TO (destination inbox — defaults to company.email)
 */
export async function sendNotificationEmail(params: {
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM, NOTIFY_TO } =
    process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    // Not configured — log instead of failing, so the site keeps working
    // in local/dev environments before SMTP credentials are supplied.
    console.log("[mailer] SMTP not configured — logging submission instead:");
    console.log(params.subject);
    console.log(params.html);
    return { delivered: false };
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD }
  });

  await transporter.sendMail({
    from: SMTP_FROM || SMTP_USER,
    to: NOTIFY_TO || company.email,
    replyTo: params.replyTo,
    subject: params.subject,
    html: params.html
  });

  return { delivered: true };
}
