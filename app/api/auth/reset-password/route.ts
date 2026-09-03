import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { consumePasswordResetCode } from "@/lib/auth/otp";
import { hashPassword, validatePasswordStrength } from "@/lib/auth/password";
import { enforceRateLimit } from "@/lib/security/rateLimit";
import { requestContext } from "@/lib/security/request";
import { writeAuditLog } from "@/lib/audit/audit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const email = String(data.email || "").trim().toLowerCase();
    const code = String(data.code || "").trim();
    const password = String(data.password || "");
    const context = requestContext(req);

    if (!/^\S+@\S+\.\S+$/.test(email) || !/^\d{6}$/.test(code)) {
      return NextResponse.json({ ok: false, error: "Invalid or expired reset code." }, { status: 400 });
    }
    const passwordError = validatePasswordStrength(password);
    if (passwordError) return NextResponse.json({ ok: false, error: passwordError }, { status: 400 });

    const rate = await enforceRateLimit({
      namespace: "reset-password",
      identity: `${email}:${context.ip || "unknown"}`,
      maxAttempts: 5,
      windowMs: 15 * 60 * 1000,
      blockMs: 30 * 60 * 1000
    });
    if (!rate.allowed) return NextResponse.json({ ok: false, error: "Too many attempts" }, { status: 429 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.status !== "ACTIVE" || !(await consumePasswordResetCode(user.id, code))) {
      return NextResponse.json({ ok: false, error: "Invalid or expired reset code." }, { status: 400 });
    }

    await prisma.$transaction([
      prisma.user.update({ where: { id: user.id }, data: { passwordHash: await hashPassword(password) } }),
      prisma.session.deleteMany({ where: { userId: user.id } })
    ]);
    await writeAuditLog({ actorUserId: user.id, action: "AUTH_PASSWORD_RESET", entityType: "User", entityId: user.id, ...context });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Password reset error", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
