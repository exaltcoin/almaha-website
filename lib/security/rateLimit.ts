import { prisma } from "@/lib/db/prisma";
import { hashToken } from "@/lib/security/tokens";

export async function enforceRateLimit(params: {
  namespace: string;
  identity: string;
  maxAttempts: number;
  windowMs: number;
  blockMs?: number;
}) {
  const now = new Date();
  const key = hashToken(`${params.namespace}:${params.identity.toLowerCase()}`);
  const existing = await prisma.securityCounter.findUnique({ where: { key } });

  if (existing?.blockedUntil && existing.blockedUntil > now) {
    return { allowed: false, retryAfterMs: existing.blockedUntil.getTime() - now.getTime() };
  }

  const windowExpired = !existing || now.getTime() - existing.windowStart.getTime() >= params.windowMs;
  if (windowExpired) {
    await prisma.securityCounter.upsert({
      where: { key },
      create: { key, count: 1, windowStart: now },
      update: { count: 1, windowStart: now, blockedUntil: null }
    });
    return { allowed: true, retryAfterMs: 0 };
  }

  const nextCount = existing.count + 1;
  const shouldBlock = nextCount > params.maxAttempts;
  const blockedUntil = shouldBlock ? new Date(now.getTime() + (params.blockMs ?? params.windowMs)) : null;

  await prisma.securityCounter.update({
    where: { key },
    data: { count: nextCount, blockedUntil }
  });

  return {
    allowed: !shouldBlock,
    retryAfterMs: blockedUntil ? blockedUntil.getTime() - now.getTime() : 0
  };
}

export async function clearRateLimit(namespace: string, identity: string) {
  const key = hashToken(`${namespace}:${identity.toLowerCase()}`);
  await prisma.securityCounter.deleteMany({ where: { key } });
}
