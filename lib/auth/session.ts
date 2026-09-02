import { cookies } from "next/headers";
import { prisma } from "@/lib/db/prisma";
import { hashIp, hashToken, randomToken } from "@/lib/security/tokens";

const COOKIE_NAME = "almaha_session";
const SESSION_DAYS = 14;

export async function createSession(userId: string, context?: { ip?: string | null; userAgent?: string | null }) {
  const token = randomToken();
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  await prisma.session.create({
    data: {
      userId,
      tokenHash: hashToken(token),
      expiresAt,
      ipHash: hashIp(context?.ip),
      userAgent: context?.userAgent?.slice(0, 500) || null
    }
  });

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt
  });

  return expiresAt;
}

export async function getCurrentSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { user: { include: { customerProfile: true } } }
  });

  if (!session || session.expiresAt <= new Date() || session.user.status !== "ACTIVE") {
    if (session) await prisma.session.delete({ where: { id: session.id } }).catch(() => undefined);
    return null;
  }

  return session;
}

export async function revokeCurrentSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { tokenHash: hashToken(token) } });
  }
  store.set(COOKIE_NAME, "", { httpOnly: true, path: "/", expires: new Date(0) });
}
