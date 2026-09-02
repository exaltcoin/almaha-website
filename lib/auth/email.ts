import { sendNotificationEmail } from "@/lib/mailer";

export async function sendVerificationEmail(email: string, code: string) {
  const safeCode = code.replace(/[^0-9]/g, "");
  return sendNotificationEmail({
    to: email,
    requireDelivery: true,
    subject: "Verify your Al Maha account",
    html: `
      <h2>Verify your Al Maha account</h2>
      <p>Your verification code is:</p>
      <p style="font-size:24px;font-weight:700;letter-spacing:4px">${safeCode}</p>
      <p>This code expires in 10 minutes.</p>
      <p>If you did not create this account, you can ignore this email.</p>
    `
  });
}
