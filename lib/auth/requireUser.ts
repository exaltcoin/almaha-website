import type { UserRole } from "@prisma/client";
import { getCurrentSession } from "@/lib/auth/session";

export class AuthError extends Error {
  constructor(message: string, public status = 401) {
    super(message);
  }
}

export async function requireUser(allowedRoles?: readonly UserRole[]) {
  const session = await getCurrentSession();
  if (!session) throw new AuthError("Authentication required", 401);
  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    throw new AuthError("Forbidden", 403);
  }
  return session.user;
}
