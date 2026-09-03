export type NotificationChannel =
  | "email"
  | "sms"
  | "whatsapp"
  | "push";

export type NotificationEvent =
  | "EMAIL_VERIFICATION"
  | "PROJECT_CREATED"
  | "MEDIA_UPLOADED"
  | "SURVEY_SCHEDULED"
  | "QUOTATION_READY"
  | "CONTRACT_READY"
  | "PAYMENT_RECEIVED"
  | "FABRICATION_STARTED"
  | "INSTALLATION_SCHEDULED"
  | "PROJECT_COMPLETED"
  | "WARRANTY_ACTIVATED";

export type NotificationStatus =
  | "queued"
  | "sent"
  | "failed"
  | "skipped";

export interface NotificationRecipient {
  userId?: string;
  email?: string;
  phone?: string;
}

export interface NotificationMessage {
  subject?: string;
  text: string;
  html?: string;
}

export interface SendNotificationInput {
  channel: NotificationChannel;
  recipient: NotificationRecipient;
  message: NotificationMessage;
}

export interface NotificationResult {
  status: NotificationStatus;
  channel: NotificationChannel;
  provider?: string;
  messageId?: string;
  error?: string;
}

export interface NotificationProvider {
  send(
    input: SendNotificationInput
  ): Promise<NotificationResult>;
}
