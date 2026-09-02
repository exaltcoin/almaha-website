import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { hashPassword, validatePasswordStrength } from "@/lib/auth/password";
import { issueEmailVerificationCode } from "@/lib/auth/otp";
import { enforceRateLimit } from "@/lib/security/rateLimit";
import { requestContext } from "@/lib/security/request";
import { writeAuditLog } from "@/lib/audit/audit";
import { sendVerificationEmail } from "@/lib/auth/email";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const context = requestContext(req);
    const data = await req.json();
    const email = String(data.email || "").trim().toLowerCase();
    const fullName = String(data.fullName || "").trim();
    const phone = String(data.phone || "").trim();
    const password = String(data.password || "");

    if (!email || !/^\S+@\S+\.\S+$/.test(email) || !fullName) {
      return NextResponse.json({ ok: false, error: "Invalid registration details" }, { status: 400 });
    }
    const passwordError = validatePasswordStrength(password);
    if (passwordError) return NextResponse.json({ ok: false, error: passwordError }, { status: 400 });

    const rate = await enforceRateLimit({
      namespace: "register",
      identity: `${email}:${context.ip || "unknown"}`,
      maxAttempts: 5,
      windowMs: 15 * 60 * 1000,
      blockMs: 30 * 60 * 1000
    });
    if (!rate.allowed) return NextResponse.json({ ok: false, error: "Too many attempts" }, { status: 429 });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      // Generic response prevents simple account enumeration.
      return NextResponse.json({ ok: true, verificationRequired: true });
    }

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: await hashPassword(password),
        customerProfile: { create: { fullName, phone: phone || null } }
      }
    });
    const { code } = await issueEmailVerificationCode(user.id);

    await writeAuditLog({
      actorUserId: user.id,
      action: "AUTH_REGISTER",
      entityType: "User",
      entityId: user.id,
      ip: context.ip,
      userAgent: context.userAgent
    });

    await sendVerificationEmail(email, code);
    if (process.env.NODE_ENV !== "production") {
      console.log(`[auth] Verification code for ${email}: ${code}`);
    }

    return NextResponse.json({ ok: true, verificationRequired: true });
  } catch (error) {
    console.error("Registration error", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
