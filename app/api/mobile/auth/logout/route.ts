import { NextRequest, NextResponse } from "next/server";
import { revokeCurrentSession } from "@/lib/auth/session";
import { requestContext } from "@/lib/security/request";
import { writeAuditLog } from "@/lib/audit/audit";
import { getCurrentSession } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const session = await getCurrentSession();
    const context = requestContext(req);

    if (session) {
      await writeAuditLog({
        actorUserId: session.user.id,
        action: "AUTH_MOBILE_LOGOUT",
        entityType: "User",
        entityId: session.user.id,
        ...context
      });
    }

    await revokeCurrentSession();

    return NextResponse.json({
      ok: true
    });
  } catch (error) {
    console.error("Mobile logout error", error);

    return NextResponse.json(
      { ok: false },
      { status: 500 }
    );
  }
}