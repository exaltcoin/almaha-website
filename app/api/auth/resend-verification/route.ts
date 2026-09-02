import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { issueEmailVerificationCode } from "@/lib/auth/otp";
import { sendVerificationEmail } from "@/lib/auth/email";
import { enforceRateLimit } from "@/lib/security/rateLimit";
import { requestContext } from "@/lib/security/request";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const email = String(data.email || "").trim().toLowerCase();
    const context = requestContext(req);

    const rate = await enforceRateLimit({
      namespace: "resend-verification",
      identity: `${email}:${context.ip || "unknown"}`,
      maxAttempts: 3,
      windowMs: 15 * 60 * 1000,
      blockMs: 30 * 60 * 1000
    });
    if (!rate.allowed) {
      return NextResponse.json({ ok: false, error: "Too many attempts" }, { status: 429 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (user && user.status === "PENDING_VERIFICATION") {
      const { code } = await issueEmailVerificationCode(user.id);
      await sendVerificationEmail(email, code);
      if (process.env.NODE_ENV !== "production") {
        console.log(`[auth] Verification code for ${email}: ${code}`);
      }
    }

    // Generic success avoids exposing whether an account exists.
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Resend verification error", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
