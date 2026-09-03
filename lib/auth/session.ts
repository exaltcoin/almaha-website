import { cookies, headers } from "next/headers";
import { prisma } from "@/lib/db/prisma";
import { hashIp, hashToken, randomToken } from "@/lib/security/tokens";

const COOKIE_NAME = "almaha_session";
const SESSION_DAYS = 14;

type SessionContext = {
  ip?: string | null;
  userAgent?: string | null;
};

async function createStoredSession(
  userId: string,
  context?: SessionContext
) {
  const token = randomToken();
  const expiresAt = new Date(
    Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000
  );

  await prisma.session.create({
    data: {
      userId,
      tokenHash: hashToken(token),
      expiresAt,
      ipHash: hashIp(context?.ip),
      userAgent: context?.userAgent?.slice(0, 500) || null
    }
  });

  return { token, expiresAt };
}

export async function createSession(
  userId: string,
  context?: SessionContext
) {
  const { token, expiresAt } = await createStoredSession(userId, context);

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

export async function createBearerSession(
  userId: string,
  context?: SessionContext
) {
  return createStoredSession(userId, context);
}

async function getPresentedSessionToken() {
  const headerStore = await headers();
  const authorization = headerStore.get("authorization");

  if (authorization) {
    const match = authorization.match(/^Bearer\s+(.+)$/i);
    const bearerToken = match?.[1]?.trim();

    if (bearerToken && bearerToken.length <= 512) {
      return {
        token: bearerToken,
        transport: "bearer" as const
      };
    }
  }

  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(COOKIE_NAME)?.value;

  if (cookieToken) {
    return {
      token: cookieToken,
      transport: "cookie" as const
    };
  }

  return null;
}

export async function getCurrentSession() {
  const presented = await getPresentedSessionToken();
  if (!presented) return null;

  const session = await prisma.session.findUnique({
    where: {
      tokenHash: hashToken(presented.token)
    },
    include: {
      user: {
        include: {
          customerProfile: true
        }
      }
    }
  });

  if (
    !session ||
    session.expiresAt <= new Date() ||
    session.user.status !== "ACTIVE"
  ) {
    if (session) {
      await prisma.session
        .delete({ where: { id: session.id } })
        .catch(() => undefined);
    }

    return null;
  }

  return session;
}

export async function revokeCurrentSession() {
  const presented = await getPresentedSessionToken();

  if (presented?.token) {
    await prisma.session.deleteMany({
      where: {
        tokenHash: hashToken(presented.token)
      }
    });
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0)
  });
}