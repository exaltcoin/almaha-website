import { sendNotificationEmail } from "../mailer";

import type {
  NotificationProvider,
  NotificationResult,
  SendNotificationInput,
} from "./types";

export class EmailNotificationProvider
  implements NotificationProvider
{
  async send(
    input: SendNotificationInput
  ): Promise<NotificationResult> {
    if (input.channel !== "email") {
      return {
        status: "failed",
        channel: input.channel,
        provider: "email",
        error: "Email provider received a non-email notification.",
      };
    }

    const to = input.recipient.email?.trim();

    if (!to) {
      return {
        status: "failed",
        channel: "email",
        provider: "email",
        error: "Email recipient is required.",
      };
    }

    await sendNotificationEmail({
      to,
      subject: input.message.subject || "Al Maha Notification",
      html: input.message.html || `<p>${input.message.text.replace(/</g, "&lt;")}</p>`,
      requireDelivery: process.env.NODE_ENV === "production",
    });

    return {
      status: "sent",
      channel: "email",
      provider: "smtp",
    };
  }
}
