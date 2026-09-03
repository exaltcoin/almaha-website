import type {
  NotificationChannel,
  NotificationProvider,
  NotificationResult,
  SendNotificationInput,
} from "./types";
import { EmailNotificationProvider } from "./emailProvider";

const providers = new Map<
  NotificationChannel,
  NotificationProvider
>();

let defaultsInitialized = false;

function initializeDefaultProviders() {
  if (!defaultsInitialized) {
    providers.set("email", new EmailNotificationProvider());
    defaultsInitialized = true;
  }
}

export function registerNotificationProvider(
  channel: NotificationChannel,
  provider: NotificationProvider
): void {
  providers.set(channel, provider);
}

export function unregisterNotificationProvider(
  channel: NotificationChannel
): void {
  providers.delete(channel);
}

export function hasNotificationProvider(
  channel: NotificationChannel
): boolean {
  return providers.has(channel);
}

export async function sendNotification(
  input: SendNotificationInput
): Promise<NotificationResult> {
  initializeDefaultProviders();
  const provider = providers.get(input.channel);

  if (!provider) {
    return {
      status: "skipped",
      channel: input.channel,
      error: `No notification provider configured for ${input.channel}.`,
    };
  }

  try {
    return await provider.send(input);
  } catch {
    return {
      status: "failed",
      channel: input.channel,
      error: "Notification provider failed.",
    };
  }
}
