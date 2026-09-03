import { apiRequest } from "../api/client";

type RegisterResponse = {
  ok: boolean;
  message?: string;
};

type VerifyResponse = {
  ok: boolean;
  message?: string;
};

export async function registerCustomer(input: {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
}): Promise<RegisterResponse> {
  return apiRequest<RegisterResponse>("/api/auth/register", {
    method: "POST",
    authenticated: false,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fullName: input.fullName.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone?.trim() || undefined,
      password: input.password
    })
  });
}

export async function verifyEmail(input: {
  email: string;
  code: string;
}): Promise<VerifyResponse> {
  return apiRequest<VerifyResponse>("/api/auth/verify", {
    method: "POST",
    authenticated: false,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: input.email.trim().toLowerCase(),
      code: input.code.trim()
    })
  });
}