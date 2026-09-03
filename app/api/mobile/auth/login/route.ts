import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createBearerSession } from "@/lib/auth/session";
import { clearRateLimit, enforceRateLimit } from "@/lib/security/rateLimit";
import { requestContext } from "@/lib/security/request";
import { writeAuditLog } from "@/lib/audit/audit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const context = requestContext(req);
    const data = await req.json();

    const email = String(data.email || "").trim().toLowerCase();
    const password = String(data.password || "");

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    const identity = `${email}:${context.ip || "unknown"}`;

    const rate = await enforceRateLimit({
      namespace: "mobile-login",
      identity,
      maxAttempts: 5,
      windowMs: 15 * 60 * 1000,
      blockMs: 30 * 60 * 1000
    });

    if (!rate.allowed) {
      return NextResponse.json(
        { ok: false, error: "Too many attempts" },
        { status: 429 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    const valid = user
      ? await verifyPassword(password, user.passwordHash)
      : false;

    if (!user || !valid) {
      return NextResponse.json(
        { ok: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (user.status === "PENDING_VERIFICATION") {
      return NextResponse.json(
        {
          ok: false,
          error: "Email verification required",
          verificationRequired: true
        },
        { status: 403 }
      );
    }

    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        { ok: false, error: "Account unavailable" },
        { status: 403 }
      );
    }

    await clearRateLimit("mobile-login", identity);

    const { token, expiresAt } = await createBearerSession(
      user.id,
      context
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });

    await writeAuditLog({
      actorUserId: user.id,
      action: "AUTH_MOBILE_LOGIN",
      entityType: "User",
      entityId: user.id,
      ...context
    });

    return NextResponse.json({
      ok: true,
      token,
      tokenType: "Bearer",
      expiresAt: expiresAt.toISOString(),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    console.error("Mobile login error", error);

    return NextResponse.json(
      { ok: false },
      { status: 500 }
    );
  }
}