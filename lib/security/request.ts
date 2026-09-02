import type { NextRequest } from "next/server";

export function requestContext(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || null;
  return {
    ip,
    userAgent: req.headers.get("user-agent")
  };
}
