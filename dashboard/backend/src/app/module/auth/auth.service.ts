import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "../../lib/prisma";
import { env } from "../../config/env";
import { sendEmail } from "../../utils/sendEmail";
import { storeOtp, getOtp, deleteOtp, OtpPurpose } from "./otp.service";
import AppError from "../../errors/AppError";

const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const RESET_TOKEN_EXPIRES_IN = "10m";

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

interface JwtPayload {
  sub: number;
  role: string;
  phone?: string;
}

interface ResetTokenPayload {
  sub: number;
  purpose: "password-reset";
}

const hashToken = (rawToken: string): string => {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
};

const toPublicUser = (user: any) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

const issueAccessToken = (user: { id: number; role: string; phone?: string | null }): string => {
  return jwt.sign(
    { sub: user.id, role: user.role, phone: user.phone },
    env.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN as any }
  );
};

const issueRefreshToken = async (userId: number): Promise<string> => {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);

  await prisma.refreshToken.create({
    data: {
      userId,
      tokenHash,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
    },
  });

  return rawToken;
};

const issueTokenPair = async (user: { id: number; role: string; phone?: string | null }): Promise<TokenPair> => {
  const accessToken = issueAccessToken(user);
  const refreshToken = await issueRefreshToken(user.id);
  return { accessToken, refreshToken };
};

const sendOtpEmail = async (email: string, otp: string): Promise<void> => {
  try {
    await sendEmail({
      to: email,
      subject: "Your Verification Code",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #f9fafb; padding: 40px 20px;">
          <div style="background: #ffffff; border-radius: 10px; padding: 40px; border: 1px solid #e5e7eb;">
            <h2 style="margin: 0; color: #111827; text-align: center;">Your Verification Code</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-top: 24px;">
              Use the following code to verify your account:
            </p>
            <div style="text-align: center; margin: 35px 0;">
              <span style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 14px 28px; border-radius: 8px; font-size: 24px; font-weight: 600; letter-spacing: 4px;">${otp}</span>
            </div>
            <p style="color: #6b7280; font-size: 14px; text-align: center;">
              This code will expire in 5 minutes.
            </p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.warn("Failed to send OTP email", err);
  }
};

export const register = async (data: {
  name: string;
  identifier: string;
  password: string;
  role?: string;
}): Promise<{ success: boolean; message: string }> => {
  const isEmail = data.identifier.includes("@");

  const existing = isEmail
    ? await prisma.user.findUnique({ where: { email: data.identifier } })
    : await prisma.user.findUnique({ where: { phone: data.identifier } });

  if (existing) {
    throw new AppError(
      409,
      isEmail
        ? "An account with this email already exists."
        : "An account with this phone number already exists."
    );
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  await prisma.user.create({
    data: {
      name: data.name,
      phone: isEmail ? null : data.identifier,
      email: isEmail ? data.identifier : null,
      role: (data.role as any) || "user",
      password: passwordHash,
      verified: false,
    },
  });

  await sendOtp(data.identifier, "verify");

  return {
    success: true,
    message:
      "Registered successfully. Please verify your account with the code sent to you.",
  };
};

export const login = async (
  identifier: string,
  password: string
): Promise<TokenPair & { user: any }> => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ phone: identifier }, { email: identifier }],
    },
  });

  if (!user || !user.password) {
    throw new AppError(401, "Invalid credentials.");
  }

  const matches = await bcrypt.compare(password, user.password);
  if (!matches) {
    throw new AppError(401, "Invalid credentials.");
  }

  if (!user.verified) {
    throw new AppError(403, "Please verify your account before signing in.");
  }

  const tokens = await issueTokenPair(user);
  return { ...tokens, user: toPublicUser(user) };
};

export const sendOtp = async (
  phone: string,
  purpose: OtpPurpose = "login",
  notifyEmail?: string
): Promise<{ success: boolean; message: string; otp?: string }> => {
  if (!phone) {
    throw new AppError(400, "Phone number or email is required");
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  await storeOtp(phone, otp, purpose, 300);

  const emailTarget = phone.includes("@") ? phone : notifyEmail;
  if (emailTarget) {
    await sendOtpEmail(emailTarget, otp);
  }

  return {
    success: true,
    message: `OTP sent successfully to ${phone}`,
    ...(process.env.NODE_ENV !== "production" ? { otp } : {}),
  };
};

export const verifyOtp = async (
  phone: string,
  code: string,
  purpose: OtpPurpose = "login"
): Promise<{
  verified: boolean;
  accessToken?: string;
  refreshToken?: string;
  resetToken?: string;
  user?: any;
  message: string;
}> => {
  if (!phone || !code) {
    throw new AppError(400, "Phone number and OTP code are required");
  }

  const savedRecord = await getOtp(phone);

  if (!savedRecord) {
    throw new AppError(
      400,
      "OTP has expired or does not exist. Please request a new one."
    );
  }

  if (savedRecord.code !== code) {
    throw new AppError(400, "Invalid OTP code. Please try again.");
  }

  if (savedRecord.purpose !== purpose) {
    throw new AppError(400, "Invalid OTP code. Please try again.");
  }

  await deleteOtp(phone);

  if (purpose === "reset") {
    const user = await prisma.user.findFirst({
      where: { OR: [{ phone }, { email: phone }] },
    });
    if (!user) {
      throw new AppError(400, "No account found for this identifier.");
    }
    const resetToken = jwt.sign(
      { sub: user.id, purpose: "password-reset" } as ResetTokenPayload,
      env.JWT_SECRET,
      { expiresIn: RESET_TOKEN_EXPIRES_IN as any }
    );
    return {
      verified: true,
      resetToken,
      message: "OTP verified successfully.",
    };
  }

  if (purpose === "verify") {
    const user = await prisma.user.findFirst({
      where: { OR: [{ phone }, { email: phone }] },
    });
    if (!user) {
      throw new AppError(400, "No account found for this identifier.");
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { verified: true },
    });
    const tokens = await issueTokenPair(user);
    return {
      verified: true,
      ...tokens,
      user: toPublicUser({ ...user, verified: true }),
      message: "OTP verified successfully.",
    };
  }

  // purpose === 'login': find or create user by phone
  let user = await prisma.user.findUnique({ where: { phone } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        phone,
        role: "user",
        verified: true,
      },
    });
  }
  const tokens = await issueTokenPair(user);
  return {
    verified: true,
    ...tokens,
    user: toPublicUser(user),
    message: "OTP verified successfully.",
  };
};

export const forgotPassword = async (
  identifier: string
): Promise<{ success: boolean; message: string }> => {
  const user = await prisma.user.findFirst({
    where: { OR: [{ phone: identifier }, { email: identifier }] },
  });

  if (user) {
    await sendOtp(identifier, "reset");
  }

  return {
    success: true,
    message:
      "If an account exists for this identifier, a reset code has been sent.",
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
  await prisma.user.update({
    where: { id: payload.sub },
    data: { password: passwordHash },
  });

  return { success: true, message: "Password reset successfully." };
};

export const loginWithGoogle = async (
  idToken: string
): Promise<TokenPair & { user: any }> => {
  const client = new OAuth2Client();

  let payload: any;
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch {
    throw new AppError(401, "Invalid Google token.");
  }

  if (!payload?.sub) {
    throw new AppError(401, "Invalid Google token.");
  }

  const user = await findOrCreateByOAuth({
    provider: "google",
    providerId: payload.sub,
    email: payload.email,
    name: payload.name,
  });

  const tokens = await issueTokenPair(user);
  return { ...tokens, user: toPublicUser(user) };
};

export const loginWithFacebook = async (
  accessToken: string
): Promise<TokenPair & { user: any }> => {
  const appId = env.FACEBOOK_APP_ID;
  const appSecret = env.FACEBOOK_APP_SECRET;

  const debugResponse = await fetch(
    `https://graph.facebook.com/debug_token?input_token=${encodeURIComponent(accessToken)}&access_token=${encodeURIComponent(`${appId}|${appSecret}`)}`
  );
  const debugBody = (await debugResponse.json().catch(() => null)) as {
    data?: { is_valid?: boolean; app_id?: string };
  } | null;

  if (
    !debugResponse.ok ||
    !debugBody?.data?.is_valid ||
    debugBody.data.app_id !== appId
  ) {
    throw new AppError(401, "Invalid Facebook token.");
  }

  const response = await fetch(
    `https://graph.facebook.com/me?fields=id,name,email&access_token=${encodeURIComponent(accessToken)}`
  );
  if (!response.ok) {
    throw new AppError(401, "Invalid Facebook token.");
  }
  const profile = (await response.json()) as {
    id: string;
    name?: string;
    email?: string;
  };
  if (!profile?.id) {
    throw new AppError(401, "Invalid Facebook token.");
  }

  const user = await findOrCreateByOAuth({
    provider: "facebook",
    providerId: profile.id,
    email: profile.email,
    name: profile.name,
  });

  const tokens = await issueTokenPair(user);
  return { ...tokens, user: toPublicUser(user) };
};

export const refreshTokens = async (
  rawRefreshToken: string
): Promise<TokenPair> => {
  if (!rawRefreshToken) {
    throw new AppError(401, "Refresh token is required");
  }

  const tokenHash = hashToken(rawRefreshToken);
  const existing = await prisma.refreshToken.findUnique({
    where: { tokenHash },
  });

  if (
    !existing ||
    existing.revokedAt ||
    existing.expiresAt.getTime() < Date.now()
  ) {
    throw new AppError(401, "Invalid or expired refresh token");
  }

  const user = await prisma.user.findUnique({
    where: { id: existing.userId },
  });
  if (!user) {
    throw new AppError(401, "Invalid or expired refresh token");
  }

  // Rotate: revoke the used token
  await prisma.refreshToken.update({
    where: { id: existing.id },
    data: { revokedAt: new Date() },
  });

  return issueTokenPair(user);
};

export const logout = async (
  rawRefreshToken: string
): Promise<{ success: boolean }> => {
  if (!rawRefreshToken) {
    return { success: true };
  }

  const tokenHash = hashToken(rawRefreshToken);
  const existing = await prisma.refreshToken.findUnique({
    where: { tokenHash },
  });

  if (
    !existing ||
    existing.revokedAt ||
    existing.expiresAt.getTime() < Date.now()
  ) {
    throw new AppError(401, "Invalid or expired refresh token");
  }

  await prisma.refreshToken.update({
    where: { id: existing.id },
    data: { revokedAt: new Date() },
  });

  return { success: true };
};

export const getProfile = async (userId: number) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new AppError(404, "User not found");
  }
  return toPublicUser(user);
};

// Helper: find or create user by OAuth provider
async function findOrCreateByOAuth(input: {
  provider: "google" | "facebook";
  providerId: string;
  email?: string;
  name?: string;
}): Promise<any> {
  const idColumn = input.provider === "google" ? "googleId" : "facebookId";

  // Try finding by provider ID
  const existingByProvider = await prisma.user.findFirst({
    where: { [idColumn]: input.providerId },
  });
  if (existingByProvider) {
    return existingByProvider;
  }

  // Try finding by email and link provider
  if (input.email) {
    const existingByEmail = await prisma.user.findUnique({
      where: { email: input.email },
    });
    if (existingByEmail) {
      return prisma.user.update({
        where: { id: existingByEmail.id },
        data: { [idColumn]: input.providerId },
      });
    }
  }

  // Create new user
  return prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      phone: `${input.provider}:${input.providerId}`,
      role: "user",
      verified: true,
      [idColumn]: input.providerId,
    },
  });
}
