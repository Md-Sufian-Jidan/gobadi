import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { env } from "../../config/env";
import { sendEmail } from "../../utils/sendEmail";
import { redis } from "../../config/upstash";
import AppError from "../../errors/AppError";

const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const RESET_TOKEN_EXPIRES_IN = "10m";

export interface AdminTokenPair {
  accessToken: string;
  refreshToken: string;
}

interface AdminJwtPayload {
  sub: number;
  role: string;
  email?: string;
}

interface ResetTokenPayload {
  sub: number;
  purpose: "password-reset";
}

// In-memory OTP fallback
const otpMemoryFallback = new Map<string, { code: string; purpose: string; expiresAt: number }>();

const hashToken = (rawToken: string): string => {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
};

const toPublicAdmin = (admin: any) => {
  const { password, ...safeAdmin } = admin;
  return safeAdmin;
};

const issueAccessToken = (admin: { id: number; role: string; email: string }): string => {
  return jwt.sign(
    { sub: admin.id, role: admin.role, email: admin.email },
    env.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN as any }
  );
};

const issueRefreshToken = async (adminId: number): Promise<string> => {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);

  await prisma.adminRefreshToken.create({
    data: {
      adminId,
      tokenHash,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
    },
  });

  return rawToken;
};

const issueTokenPair = async (admin: { id: number; role: string; email: string }): Promise<AdminTokenPair> => {
  const accessToken = issueAccessToken(admin);
  const refreshToken = await issueRefreshToken(admin.id);
  return { accessToken, refreshToken };
};

const storeOtp = async (email: string, code: string, purpose: string, ttlSeconds: number = 300): Promise<void> => {
  try {
    await redis.set(`admin_otp:${email}`, JSON.stringify({ code, purpose }), { ex: ttlSeconds });
  } catch {
    otpMemoryFallback.set(email, {
      code,
      purpose,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }
};

const getOtp = async (email: string): Promise<{ code: string; purpose: string } | null> => {
  try {
    const raw = await redis.get<string>(`admin_otp:${email}`);
    if (raw) {
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (parsed && typeof parsed.code === "string") {
        return parsed;
      }
    }
  } catch {
    // fallback
  }

  const entry = otpMemoryFallback.get(email);
  if (entry && entry.expiresAt > Date.now()) {
    return { code: entry.code, purpose: entry.purpose };
  }

  return null;
};

const deleteOtp = async (email: string): Promise<void> => {
  try {
    await redis.del(`admin_otp:${email}`);
  } catch {
    // ignore
  }
  otpMemoryFallback.delete(email);
};

const sendOtpEmail = async (email: string, otp: string): Promise<void> => {
  try {
    await sendEmail({
      to: email,
      subject: "Your Admin Verification Code",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #f9fafb; padding: 40px 20px;">
          <div style="background: #ffffff; border-radius: 10px; padding: 40px; border: 1px solid #e5e7eb;">
            <h2 style="margin: 0; color: #111827; text-align: center;">Your Verification Code</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-top: 24px;">
              Use the following code to verify your admin account:
            </p>
            <div style="text-align: center; margin: 35px 0;">
              <span style="display: inline-block; background-color: #dc2626; color: #ffffff; padding: 14px 28px; border-radius: 8px; font-size: 24px; font-weight: 600; letter-spacing: 4px;">${otp}</span>
            </div>
            <p style="color: #6b7280; font-size: 14px; text-align: center;">
              This code will expire in 5 minutes.
            </p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.warn("Failed to send admin OTP email", err);
  }
};

export const login = async (
  email: string,
  password: string
): Promise<AdminTokenPair & { admin: any }> => {
  const admin = await prisma.admin.findUnique({
    where: { email: email.trim().toLowerCase() },
  });

  if (!admin) {
    throw new AppError(401, "Invalid credentials.");
  }

  const matches = await bcrypt.compare(password, admin.password);
  if (!matches) {
    throw new AppError(401, "Invalid credentials.");
  }

  if (!admin.verified) {
    throw new AppError(403, "Please verify your account before signing in.");
  }

  const tokens = await issueTokenPair(admin);
  return { ...tokens, admin: toPublicAdmin(admin) };
};

export const sendOtp = async (
  email: string,
  purpose: "verify" | "reset" = "verify"
): Promise<{ success: boolean; message: string; otp?: string }> => {
  if (!email) {
    throw new AppError(400, "Email is required");
  }

  const admin = await prisma.admin.findUnique({
    where: { email: email.trim().toLowerCase() },
  });

  if (purpose === "reset" && !admin) {
    return {
      success: true,
      message: "If an account exists for this email, a reset code has been sent.",
    };
  }

  if (purpose === "verify" && !admin) {
    throw new AppError(404, "No admin account found with this email.");
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  await storeOtp(email.trim().toLowerCase(), otp, purpose, 300);

  await sendOtpEmail(email.trim().toLowerCase(), otp);

  return {
    success: true,
    message: `OTP sent successfully to ${email}`,
    ...(process.env.NODE_ENV !== "production" ? { otp } : {}),
  };
};

export const verifyOtp = async (
  email: string,
  code: string,
  purpose: "verify" | "reset" = "verify"
): Promise<{
  verified: boolean;
  accessToken?: string;
  refreshToken?: string;
  resetToken?: string;
  admin?: any;
  message: string;
}> => {
  if (!email || !code) {
    throw new AppError(400, "Email and OTP code are required");
  }

  const savedRecord = await getOtp(email.trim().toLowerCase());

  if (!savedRecord) {
    throw new AppError(400, "OTP has expired or does not exist. Please request a new one.");
  }

  if (savedRecord.code !== code) {
    throw new AppError(400, "Invalid OTP code. Please try again.");
  }

  if (savedRecord.purpose !== purpose) {
    throw new AppError(400, "Invalid OTP code. Please try again.");
  }

  await deleteOtp(email.trim().toLowerCase());

  const normalizedEmail = email.trim().toLowerCase();

  if (purpose === "reset") {
    const admin = await prisma.admin.findUnique({ where: { email: normalizedEmail } });
    if (!admin) {
      throw new AppError(400, "No admin account found with this email.");
    }
    const resetToken = jwt.sign(
      { sub: admin.id, purpose: "password-reset" } as ResetTokenPayload,
      env.JWT_SECRET,
      { expiresIn: RESET_TOKEN_EXPIRES_IN as any }
    );
    return {
      verified: true,
      resetToken,
      message: "OTP verified successfully.",
    };
  }

  // purpose === 'verify'
  const admin = await prisma.admin.findUnique({ where: { email: normalizedEmail } });
  if (!admin) {
    throw new AppError(400, "No admin account found with this email.");
  }
  await prisma.admin.update({
    where: { id: admin.id },
    data: { verified: true },
  });
  const tokens = await issueTokenPair(admin);
  return {
    verified: true,
    ...tokens,
    admin: toPublicAdmin({ ...admin, verified: true }),
    message: "OTP verified successfully.",
  };
};

export const forgotPassword = async (
  email: string
): Promise<{ success: boolean; message: string }> => {
  const normalizedEmail = email.trim().toLowerCase();
  const admin = await prisma.admin.findUnique({ where: { email: normalizedEmail } });

  if (admin) {
    await sendOtp(normalizedEmail, "reset");
  }

  return {
    success: true,
    message: "If an account exists for this email, a reset code has been sent.",
  };
};

export const resetPassword = async (
  resetToken: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> => {
  let payload: ResetTokenPayload;
  try {
    payload = jwt.verify(resetToken, env.JWT_SECRET) as unknown as ResetTokenPayload;
  } catch {
    throw new AppError(401, "Invalid or expired reset token.");
  }

  if (payload.purpose !== "password-reset") {
    throw new AppError(401, "Invalid reset token.");
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.admin.update({
    where: { id: payload.sub },
    data: { password: passwordHash },
  });

  return { success: true, message: "Password reset successfully." };
};

export const refreshTokens = async (
  rawRefreshToken: string
): Promise<AdminTokenPair> => {
  if (!rawRefreshToken) {
    throw new AppError(401, "Refresh token is required");
  }

  const tokenHash = hashToken(rawRefreshToken);
  const existing = await prisma.adminRefreshToken.findUnique({
    where: { tokenHash },
  });

  if (
    !existing ||
    existing.revokedAt ||
    existing.expiresAt.getTime() < Date.now()
  ) {
    throw new AppError(401, "Invalid or expired refresh token");
  }

  const admin = await prisma.admin.findUnique({
    where: { id: existing.adminId },
  });
  if (!admin) {
    throw new AppError(401, "Invalid or expired refresh token");
  }

  // Rotate: revoke the used token
  await prisma.adminRefreshToken.update({
    where: { id: existing.id },
    data: { revokedAt: new Date() },
  });

  return issueTokenPair(admin);
};

export const logout = async (
  rawRefreshToken: string
): Promise<{ success: boolean }> => {
  if (!rawRefreshToken) {
    return { success: true };
  }

  const tokenHash = hashToken(rawRefreshToken);
  const existing = await prisma.adminRefreshToken.findUnique({
    where: { tokenHash },
  });

  if (
    !existing ||
    existing.revokedAt ||
    existing.expiresAt.getTime() < Date.now()
  ) {
    throw new AppError(401, "Invalid or expired refresh token");
  }

  await prisma.adminRefreshToken.update({
    where: { id: existing.id },
    data: { revokedAt: new Date() },
  });

  return { success: true };
};

export const getProfile = async (adminId: number) => {
  const admin = await prisma.admin.findUnique({ where: { id: adminId } });
  if (!admin) {
    throw new AppError(404, "Admin not found");
  }
  return toPublicAdmin(admin);
};

export const updateProfile = async (
  adminId: number,
  data: { name?: string; designation?: string; password?: string; avatar?: string; phone?: string }
) => {
  const admin = await prisma.admin.findUnique({ where: { id: adminId } });
  if (!admin) {
    throw new AppError(404, "Admin not found");
  }

  const updateData: Record<string, any> = {};

  if (data.name !== undefined) {
    updateData.name = data.name.trim();
  }
  if (data.designation !== undefined) {
    updateData.designation = data.designation;
  }
  if (data.avatar !== undefined) {
    updateData.avatar = data.avatar;
  }
  if (data.phone !== undefined) {
    updateData.phone = data.phone;
  }
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  const updated = await prisma.admin.update({
    where: { id: adminId },
    data: updateData,
  });

  return toPublicAdmin(updated);
};
