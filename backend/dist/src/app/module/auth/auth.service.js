"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.logout = exports.refreshTokens = exports.loginWithFacebook = exports.loginWithGoogle = exports.resetPassword = exports.forgotPassword = exports.verifyOtp = exports.sendOtp = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const google_auth_library_1 = require("google-auth-library");
const prisma_1 = require("../../lib/prisma");
const env_1 = require("../../config/env");
const sendEmail_1 = require("../../utils/sendEmail");
const otp_service_1 = require("./otp.service");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const RESET_TOKEN_EXPIRES_IN = "10m";
const hashToken = (rawToken) => {
    return crypto_1.default.createHash("sha256").update(rawToken).digest("hex");
};
const toPublicUser = (user) => {
    const { password, ...safeUser } = user;
    return safeUser;
};
const issueAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({ sub: user.id, role: user.role, phone: user.phone }, env_1.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
};
const issueRefreshToken = async (userId) => {
    const rawToken = crypto_1.default.randomBytes(32).toString("hex");
    const tokenHash = hashToken(rawToken);
    await prisma_1.prisma.refreshToken.create({
        data: {
            userId,
            tokenHash,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
        },
    });
    return rawToken;
};
const issueTokenPair = async (user) => {
    const accessToken = issueAccessToken(user);
    const refreshToken = await issueRefreshToken(user.id);
    return { accessToken, refreshToken };
};
const sendOtpEmail = async (email, otp) => {
    try {
        await (0, sendEmail_1.sendEmail)({
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
    }
    catch (err) {
        console.warn("Failed to send OTP email", err);
    }
};
const register = async (data) => {
    const isEmail = data.identifier.includes("@");
    const existing = isEmail
        ? await prisma_1.prisma.user.findUnique({ where: { email: data.identifier } })
        : await prisma_1.prisma.user.findUnique({ where: { phone: data.identifier } });
    if (existing) {
        throw new AppError_1.default(409, isEmail
            ? "An account with this email already exists."
            : "An account with this phone number already exists.");
    }
    const passwordHash = await bcryptjs_1.default.hash(data.password, 10);
    await prisma_1.prisma.user.create({
        data: {
            name: data.name,
            phone: isEmail ? null : data.identifier,
            email: isEmail ? data.identifier : null,
            role: data.role || "user",
            password: passwordHash,
            verified: false,
        },
    });
    await (0, exports.sendOtp)(data.identifier, "verify");
    return {
        success: true,
        message: "Registered successfully. Please verify your account with the code sent to you.",
    };
};
exports.register = register;
const login = async (identifier, password) => {
    const user = await prisma_1.prisma.user.findFirst({
        where: {
            OR: [{ phone: identifier }, { email: identifier }],
        },
    });
    if (!user || !user.password) {
        throw new AppError_1.default(401, "Invalid credentials.");
    }
    const matches = await bcryptjs_1.default.compare(password, user.password);
    if (!matches) {
        throw new AppError_1.default(401, "Invalid credentials.");
    }
    if (!user.verified) {
        throw new AppError_1.default(403, "Please verify your account before signing in.");
    }
    const tokens = await issueTokenPair(user);
    return { ...tokens, user: toPublicUser(user) };
};
exports.login = login;
const sendOtp = async (phone, purpose = "login", notifyEmail) => {
    if (!phone) {
        throw new AppError_1.default(400, "Phone number or email is required");
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    await (0, otp_service_1.storeOtp)(phone, otp, purpose, 300);
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
exports.sendOtp = sendOtp;
const verifyOtp = async (phone, code, purpose = "login") => {
    if (!phone || !code) {
        throw new AppError_1.default(400, "Phone number and OTP code are required");
    }
    const savedRecord = await (0, otp_service_1.getOtp)(phone);
    if (!savedRecord) {
        throw new AppError_1.default(400, "OTP has expired or does not exist. Please request a new one.");
    }
    if (savedRecord.code !== code) {
        throw new AppError_1.default(400, "Invalid OTP code. Please try again.");
    }
    if (savedRecord.purpose !== purpose) {
        throw new AppError_1.default(400, "Invalid OTP code. Please try again.");
    }
    await (0, otp_service_1.deleteOtp)(phone);
    if (purpose === "reset") {
        const user = await prisma_1.prisma.user.findFirst({
            where: { OR: [{ phone }, { email: phone }] },
        });
        if (!user) {
            throw new AppError_1.default(400, "No account found for this identifier.");
        }
        const resetToken = jsonwebtoken_1.default.sign({ sub: user.id, purpose: "password-reset" }, env_1.env.JWT_SECRET, { expiresIn: RESET_TOKEN_EXPIRES_IN });
        return {
            verified: true,
            resetToken,
            message: "OTP verified successfully.",
        };
    }
    if (purpose === "verify") {
        const user = await prisma_1.prisma.user.findFirst({
            where: { OR: [{ phone }, { email: phone }] },
        });
        if (!user) {
            throw new AppError_1.default(400, "No account found for this identifier.");
        }
        await prisma_1.prisma.user.update({
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
    let user = await prisma_1.prisma.user.findUnique({ where: { phone } });
    if (!user) {
        user = await prisma_1.prisma.user.create({
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
exports.verifyOtp = verifyOtp;
const forgotPassword = async (identifier) => {
    const user = await prisma_1.prisma.user.findFirst({
        where: { OR: [{ phone: identifier }, { email: identifier }] },
    });
    if (user) {
        await (0, exports.sendOtp)(identifier, "reset");
    }
    return {
        success: true,
        message: "If an account exists for this identifier, a reset code has been sent.",
    };
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (resetToken, newPassword) => {
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(resetToken, env_1.env.JWT_SECRET);
    }
    catch {
        throw new AppError_1.default(401, "Invalid or expired reset token.");
    }
    if (payload.purpose !== "password-reset") {
        throw new AppError_1.default(401, "Invalid reset token.");
    }
    const passwordHash = await bcryptjs_1.default.hash(newPassword, 10);
    await prisma_1.prisma.user.update({
        where: { id: payload.sub },
        data: { password: passwordHash },
    });
    return { success: true, message: "Password reset successfully." };
};
exports.resetPassword = resetPassword;
const loginWithGoogle = async (idToken) => {
    const client = new google_auth_library_1.OAuth2Client();
    let payload;
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: env_1.env.GOOGLE_CLIENT_ID,
        });
        payload = ticket.getPayload();
    }
    catch {
        throw new AppError_1.default(401, "Invalid Google token.");
    }
    if (!payload?.sub) {
        throw new AppError_1.default(401, "Invalid Google token.");
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
exports.loginWithGoogle = loginWithGoogle;
const loginWithFacebook = async (accessToken) => {
    const appId = env_1.env.FACEBOOK_APP_ID;
    const appSecret = env_1.env.FACEBOOK_APP_SECRET;
    const debugResponse = await fetch(`https://graph.facebook.com/debug_token?input_token=${encodeURIComponent(accessToken)}&access_token=${encodeURIComponent(`${appId}|${appSecret}`)}`);
    const debugBody = (await debugResponse.json().catch(() => null));
    if (!debugResponse.ok ||
        !debugBody?.data?.is_valid ||
        debugBody.data.app_id !== appId) {
        throw new AppError_1.default(401, "Invalid Facebook token.");
    }
    const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${encodeURIComponent(accessToken)}`);
    if (!response.ok) {
        throw new AppError_1.default(401, "Invalid Facebook token.");
    }
    const profile = (await response.json());
    if (!profile?.id) {
        throw new AppError_1.default(401, "Invalid Facebook token.");
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
exports.loginWithFacebook = loginWithFacebook;
const refreshTokens = async (rawRefreshToken) => {
    if (!rawRefreshToken) {
        throw new AppError_1.default(401, "Refresh token is required");
    }
    const tokenHash = hashToken(rawRefreshToken);
    const existing = await prisma_1.prisma.refreshToken.findUnique({
        where: { tokenHash },
    });
    if (!existing ||
        existing.revokedAt ||
        existing.expiresAt.getTime() < Date.now()) {
        throw new AppError_1.default(401, "Invalid or expired refresh token");
    }
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: existing.userId },
    });
    if (!user) {
        throw new AppError_1.default(401, "Invalid or expired refresh token");
    }
    // Rotate: revoke the used token
    await prisma_1.prisma.refreshToken.update({
        where: { id: existing.id },
        data: { revokedAt: new Date() },
    });
    return issueTokenPair(user);
};
exports.refreshTokens = refreshTokens;
const logout = async (rawRefreshToken) => {
    if (!rawRefreshToken) {
        return { success: true };
    }
    const tokenHash = hashToken(rawRefreshToken);
    const existing = await prisma_1.prisma.refreshToken.findUnique({
        where: { tokenHash },
    });
    if (!existing ||
        existing.revokedAt ||
        existing.expiresAt.getTime() < Date.now()) {
        throw new AppError_1.default(401, "Invalid or expired refresh token");
    }
    await prisma_1.prisma.refreshToken.update({
        where: { id: existing.id },
        data: { revokedAt: new Date() },
    });
    return { success: true };
};
exports.logout = logout;
const getProfile = async (userId) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    return toPublicUser(user);
};
exports.getProfile = getProfile;
// Helper: find or create user by OAuth provider
async function findOrCreateByOAuth(input) {
    const idColumn = input.provider === "google" ? "googleId" : "facebookId";
    // Try finding by provider ID
    const existingByProvider = await prisma_1.prisma.user.findFirst({
        where: { [idColumn]: input.providerId },
    });
    if (existingByProvider) {
        return existingByProvider;
    }
    // Try finding by email and link provider
    if (input.email) {
        const existingByEmail = await prisma_1.prisma.user.findUnique({
            where: { email: input.email },
        });
        if (existingByEmail) {
            return prisma_1.prisma.user.update({
                where: { id: existingByEmail.id },
                data: { [idColumn]: input.providerId },
            });
        }
    }
    // Create new user
    return prisma_1.prisma.user.create({
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
