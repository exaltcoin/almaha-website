import { apiRequest } from "../api/client";
import { deleteSessionToken, saveSessionToken } from "./secureSession";

export type MobileUser = {
  id: string;
  email: string;
  role: string;
  status: string;
  profile?: unknown;
};

type MobileLoginResponse = {
  ok: true;
  token: string;
  tokenType: "Bearer";
  expiresAt: string;
  user: MobileUser;
};

type AccountMeResponse = {
  ok: true;
  user: MobileUser & {
    profile?: unknown;
  };
};

export async function login(
  email: string,
  password: string
): Promise<MobileUser> {
  const response = await apiRequest<MobileLoginResponse>(
    "/api/mobile/auth/login",
    {
      method: "POST",
      authenticated: false,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password
      })
    }
  );

  await saveSessionToken(response.token);

  return response.user;
}

export async function getCurrentUser(): Promise<MobileUser> {
  const response = await apiRequest<AccountMeResponse>(
    "/api/account/me"
  );

  return response.user;
}

export async function logout(): Promise<void> {
  try {
    await apiRequest<{ ok: true }>("/api/mobile/auth/logout", {
      method: "POST"
    });
  } finally {
    await deleteSessionToken();
  }
}

export async function resendVerification(email: string): Promise<void> {
  await apiRequest("/api/auth/resend-verification", {
    method: "POST",
    authenticated: false,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim().toLowerCase() })
  });
}

export async function requestPasswordReset(email: string): Promise<void> {
  await apiRequest("/api/auth/forgot-password", {
    method: "POST",
    authenticated: false,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim().toLowerCase() })
  });
}

export async function resetPassword(email: string, code: string, password: string): Promise<void> {
  await apiRequest("/api/auth/reset-password", {
    method: "POST",
    authenticated: false,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      code: code.trim(),
      password
    })
  });
}