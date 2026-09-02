import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { consumeEmailVerificationCode } from "@/lib/auth/otp";
import { createSession } from "@/lib/auth/session";
import { requestContext } from "@/lib/security/request";
import { writeAuditLog } from "@/lib/audit/audit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const email = String(data.email || "").trim().toLowerCase();
    const code = String(data.code || "").trim();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !/^\d{6}$/.test(code)) {
      return NextResponse.json({ ok: false, error: "Invalid or expired code" }, { status: 400 });
    }

    const valid = await consumeEmailVerificationCode(user.id, code);
    if (!valid) return NextResponse.json({ ok: false, error: "Invalid or expired code" }, { status: 400 });

    const context = requestContext(req);
    await createSession(user.id, context);
    await writeAuditLog({ actorUserId: user.id, action: "AUTH_EMAIL_VERIFIED", entityType: "User", entityId: user.id, ...context });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Verification error", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
