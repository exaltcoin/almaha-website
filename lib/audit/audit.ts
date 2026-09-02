import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { hashIp } from "@/lib/security/tokens";

export async function writeAuditLog(params: {
  actorUserId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  previousValue?: Prisma.InputJsonValue;
  newValue?: Prisma.InputJsonValue;
  ip?: string | null;
  userAgent?: string | null;
}) {
  await prisma.auditLog.create({
    data: {
      actorUserId: params.actorUserId || null,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId || null,
      previousValue: params.previousValue,
      newValue: params.newValue,
      ipHash: hashIp(params.ip),
      userAgent: params.userAgent?.slice(0, 500) || null
    }
  });
}
