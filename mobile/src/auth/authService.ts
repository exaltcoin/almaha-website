import { apiRequest } from "../api/client";
import {
  deleteSessionToken,
  saveSessionToken
} from "./secureSession";

export type MobileUser = {
  id: string;
  email: string;
  role: string;
  status: string;
};

type MobileLoginResponse = {
  ok: true;
  token: string;
  tokenType: "Bearer";
  expiresAt: string;
  user: MobileUser;
};

type AccountMeResponse = {
  id: string;
  email: string;
  role: string;
  status: string;
  profile?: unknown;
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

export async function getCurrentUser(): Promise<AccountMeResponse> {
  return apiRequest<AccountMeResponse>("/api/account/me");
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