import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { issuePasswordResetCode } from "@/lib/auth/otp";
import { sendPasswordResetEmail } from "@/lib/auth/email";
import { enforceRateLimit } from "@/lib/security/rateLimit";
import { requestContext } from "@/lib/security/request";
import { writeAuditLog } from "@/lib/audit/audit";

export const runtime = "nodejs";

const GENERIC_RESPONSE = { ok: true, message: "If an account exists, a reset code will be sent." };

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const email = String(data.email || "").trim().toLowerCase();
    const context = requestContext(req);

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
    }

    const rate = await enforceRateLimit({
      namespace: "forgot-password",
      identity: `${email}:${context.ip || "unknown"}`,
      maxAttempts: 3,
      windowMs: 15 * 60 * 1000,
      blockMs: 30 * 60 * 1000
    });
    if (!rate.allowed) return NextResponse.json({ ok: false, error: "Too many attempts" }, { status: 429 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (user && user.status === "ACTIVE") {
      try {
        const { code } = await issuePasswordResetCode(user.id);
        await sendPasswordResetEmail(email, code);
        await writeAuditLog({ actorUserId: user.id, action: "AUTH_PASSWORD_RESET_REQUESTED", entityType: "User", entityId: user.id, ...context });
      } catch (error) {
        console.error("Password reset request processing error", error);
      }
    }

    return NextResponse.json(GENERIC_RESPONSE);
  } catch (error) {
    console.error("Password reset request error", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
