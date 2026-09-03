import { prisma } from "@/lib/db/prisma";
import { hashOtp, randomNumericCode } from "@/lib/security/tokens";

const OTP_MINUTES = 10;

export async function issueEmailVerificationCode(userId: string) {
  const code = randomNumericCode(6);
  const expiresAt = new Date(Date.now() + OTP_MINUTES * 60 * 1000);

  await prisma.$transaction([
    prisma.otpCode.deleteMany({ where: { userId, purpose: "VERIFY_EMAIL", consumedAt: null } }),
    prisma.otpCode.create({
      data: { userId, purpose: "VERIFY_EMAIL", codeHash: hashOtp(code), expiresAt }
    })
  ]);

  return { code, expiresAt };
}

export async function consumeEmailVerificationCode(userId: string, code: string) {
  const otp = await prisma.otpCode.findFirst({
    where: { userId, purpose: "VERIFY_EMAIL", consumedAt: null },
    orderBy: { createdAt: "desc" }
  });

  if (!otp || otp.expiresAt <= new Date() || otp.attempts >= 5) return false;

  if (otp.codeHash !== hashOtp(code)) {
    await prisma.otpCode.update({ where: { id: otp.id }, data: { attempts: { increment: 1 } } });
    return false;
  }

  await prisma.$transaction([
    prisma.otpCode.update({ where: { id: otp.id }, data: { consumedAt: new Date() } }),
    prisma.user.update({
      where: { id: userId },
      data: { status: "ACTIVE", emailVerifiedAt: new Date() }
    })
  ]);
  return true;
}

export async function issuePasswordResetCode(userId: string) {
  const code = randomNumericCode(6);
  const expiresAt = new Date(Date.now() + OTP_MINUTES * 60 * 1000);

  await prisma.$transaction([
    prisma.otpCode.deleteMany({ where: { userId, purpose: "PASSWORD_RESET", consumedAt: null } }),
    prisma.otpCode.create({
      data: { userId, purpose: "PASSWORD_RESET", codeHash: hashOtp(code), expiresAt }
    })
  ]);

  return { code, expiresAt };
}

export async function consumePasswordResetCode(userId: string, code: string) {
  const otp = await prisma.otpCode.findFirst({
    where: { userId, purpose: "PASSWORD_RESET", consumedAt: null },
    orderBy: { createdAt: "desc" }
  });

  if (!otp || otp.expiresAt <= new Date() || otp.attempts >= 5) return false;

  if (otp.codeHash !== hashOtp(code)) {
    await prisma.otpCode.update({ where: { id: otp.id }, data: { attempts: { increment: 1 } } });
    return false;
  }

  await prisma.otpCode.update({ where: { id: otp.id }, data: { consumedAt: new Date() } });
  return true;
}
