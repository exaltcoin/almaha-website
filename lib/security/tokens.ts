import { createHash, createHmac, randomBytes, randomInt } from "crypto";


function authSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET is required in production");
  }
  return secret || "dev-only-change-me";
}

export function randomToken(bytes = 32) {
  return randomBytes(bytes).toString("base64url");
}

export function randomNumericCode(length = 6) {
  const max = 10 ** length;
  return String(randomInt(0, max)).padStart(length, "0");
}

export function hashToken(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function hashOtp(value: string) {
  return createHmac("sha256", authSecret()).update(value).digest("hex");
}

export function hashIp(value?: string | null) {
  if (!value) return null;
  return createHmac("sha256", authSecret()).update(value).digest("hex");
}
