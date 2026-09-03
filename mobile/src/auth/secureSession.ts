import * as SecureStore from "expo-secure-store";

const SESSION_TOKEN_KEY = "almaha_mobile_session_token";

export async function saveSessionToken(token: string): Promise<void> {
  const value = token.trim();

  if (!value) {
    throw new Error("Cannot store an empty session token");
  }

  await SecureStore.setItemAsync(SESSION_TOKEN_KEY, value);
}

export async function getSessionToken(): Promise<string | null> {
  return SecureStore.getItemAsync(SESSION_TOKEN_KEY);
}

export async function deleteSessionToken(): Promise<void> {
  await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY);
}