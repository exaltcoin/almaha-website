import { NextResponse } from "next/server";
import { AuthError, requireUser } from "@/lib/auth/requireUser";

export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await requireUser();
    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
        profile: user.customerProfile
      }
    });
  } catch (error) {
    if (error instanceof AuthError) return NextResponse.json({ ok: false, error: error.message }, { status: error.status });
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
