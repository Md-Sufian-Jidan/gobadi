"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = exports.logout = exports.refreshTokens = exports.resetPassword = exports.forgotPassword = exports.verifyOtp = exports.sendOtp = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../../lib/prisma");
const env_1 = require("../../config/env");
const sendEmail_1 = require("../../utils/sendEmail");
const upstash_1 = require("../../config/upstash");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const RESET_TOKEN_EXPIRES_IN = "10m";
// In-memory OTP fallback
const otpMemoryFallback = new Map();
const hashToken = (rawToken) => {
    return crypto_1.default.createHash("sha256").update(rawToken).digest("hex");
};
const toPublicAdmin = (admin) => {
    const { password, ...safeAdmin } = admin;
    return safeAdmin;
};
const issueAccessToken = (admin) => {
    return jsonwebtoken_1.default.sign({ sub: admin.id, role: admin.role, email: admin.email }, env_1.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
};
const issueRefreshToken = async (adminId) => {
    const rawToken = crypto_1.default.randomBytes(32).toString("hex");
    const tokenHash = hashToken(rawToken);
    await prisma_1.prisma.adminRefreshToken.create({
        data: {
            adminId,
            tokenHash,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
        },
    });
    return rawToken;
};
const issueTokenPair = async (admin) => {
    const accessToken = issueAccessToken(admin);
    const refreshToken = await issueRefreshToken(admin.id);
    return { accessToken, refreshToken };
};
const storeOtp = async (email, code, purpose, ttlSeconds = 300) => {
    try {
        await upstash_1.redis.set(`admin_otp:${email}`, JSON.stringify({ code, purpose }), { ex: ttlSeconds });
    }
    catch {
        otpMemoryFallback.set(email, {
            code,
            purpose,
            expiresAt: Date.now() + ttlSeconds * 1000,
        });
    }
};
const getOtp = async (email) => {
    try {
        const raw = await upstash_1.redis.get(`admin_otp:${email}`);
        if (raw) {
            const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
            if (parsed && typeof parsed.code === "string") {
                return parsed;
            }
        }
    }
    catch {
        // fallback
    }
    const entry = otpMemoryFallback.get(email);
    if (entry && entry.expiresAt > Date.now()) {
        return { code: entry.code, purpose: entry.purpose };
    }
    return null;
};
const deleteOtp = async (email) => {
    try {
        await upstash_1.redis.del(`admin_otp:${email}`);
    }
    catch {
        // ignore
    }
    otpMemoryFallback.delete(email);
};
const sendOtpEmail = async (email, otp) => {
    try {
        await (0, sendEmail_1.sendEmail)({
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
    }
    catch (err) {
        console.warn("Failed to send admin OTP email", err);
    }
};
const login = async (email, password) => {
    const admin = await prisma_1.prisma.admin.findUnique({
        where: { email: email.trim().toLowerCase() },
    });
    if (!admin) {
        throw new AppError_1.default(401, "Invalid credentials.");
    }
    const matches = await bcryptjs_1.default.compare(password, admin.password);
    if (!matches) {
        throw new AppError_1.default(401, "Invalid credentials.");
    }
    if (!admin.verified) {
        throw new AppError_1.default(403, "Please verify your account before signing in.");
    }
    const tokens = await issueTokenPair(admin);
    return { ...tokens, admin: toPublicAdmin(admin) };
};
exports.login = login;
const sendOtp = async (email, purpose = "verify") => {
    if (!email) {
        throw new AppError_1.default(400, "Email is required");
    }
    const admin = await prisma_1.prisma.admin.findUnique({
        where: { email: email.trim().toLowerCase() },
    });
    if (purpose === "reset" && !admin) {
        return {
            success: true,
            message: "If an account exists for this email, a reset code has been sent.",
        };
    }
    if (purpose === "verify" && !admin) {
        throw new AppError_1.default(404, "No admin account found with this email.");
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
exports.sendOtp = sendOtp;
const verifyOtp = async (email, code, purpose = "verify") => {
    if (!email || !code) {
        throw new AppError_1.default(400, "Email and OTP code are required");
    }
    const savedRecord = await getOtp(email.trim().toLowerCase());
    if (!savedRecord) {
        throw new AppError_1.default(400, "OTP has expired or does not exist. Please request a new one.");
    }
    if (savedRecord.code !== code) {
        throw new AppError_1.default(400, "Invalid OTP code. Please try again.");
    }
    if (savedRecord.purpose !== purpose) {
        throw new AppError_1.default(400, "Invalid OTP code. Please try again.");
    }
    await deleteOtp(email.trim().toLowerCase());
    const normalizedEmail = email.trim().toLowerCase();
    if (purpose === "reset") {
        const admin = await prisma_1.prisma.admin.findUnique({ where: { email: normalizedEmail } });
        if (!admin) {
            throw new AppError_1.default(400, "No admin account found with this email.");
        }
        const resetToken = jsonwebtoken_1.default.sign({ sub: admin.id, purpose: "password-reset" }, env_1.env.JWT_SECRET, { expiresIn: RESET_TOKEN_EXPIRES_IN });
        return {
            verified: true,
            resetToken,
            message: "OTP verified successfully.",
        };
    }
    // purpose === 'verify'
    const admin = await prisma_1.prisma.admin.findUnique({ where: { email: normalizedEmail } });
    if (!admin) {
        throw new AppError_1.default(400, "No admin account found with this email.");
    }
    await prisma_1.prisma.admin.update({
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
exports.verifyOtp = verifyOtp;
const forgotPassword = async (email) => {
    const normalizedEmail = email.trim().toLowerCase();
    const admin = await prisma_1.prisma.admin.findUnique({ where: { email: normalizedEmail } });
    if (admin) {
        await (0, exports.sendOtp)(normalizedEmail, "reset");
    }
    return {
        success: true,
        message: "If an account exists for this email, a reset code has been sent.",
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
    await prisma_1.prisma.admin.update({
        where: { id: payload.sub },
        data: { password: passwordHash },
    });
    return { success: true, message: "Password reset successfully." };
};
exports.resetPassword = resetPassword;
const refreshTokens = async (rawRefreshToken) => {
    if (!rawRefreshToken) {
        throw new AppError_1.default(401, "Refresh token is required");
    }
    const tokenHash = hashToken(rawRefreshToken);
    const existing = await prisma_1.prisma.adminRefreshToken.findUnique({
        where: { tokenHash },
    });
    if (!existing ||
        existing.revokedAt ||
        existing.expiresAt.getTime() < Date.now()) {
        throw new AppError_1.default(401, "Invalid or expired refresh token");
    }
    const admin = await prisma_1.prisma.admin.findUnique({
        where: { id: existing.adminId },
    });
    if (!admin) {
        throw new AppError_1.default(401, "Invalid or expired refresh token");
    }
    // Rotate: revoke the used token
    await prisma_1.prisma.adminRefreshToken.update({
        where: { id: existing.id },
        data: { revokedAt: new Date() },
    });
    return issueTokenPair(admin);
};
exports.refreshTokens = refreshTokens;
const logout = async (rawRefreshToken) => {
    if (!rawRefreshToken) {
        return { success: true };
    }
    const tokenHash = hashToken(rawRefreshToken);
    const existing = await prisma_1.prisma.adminRefreshToken.findUnique({
        where: { tokenHash },
    });
    if (!existing ||
        existing.revokedAt ||
        existing.expiresAt.getTime() < Date.now()) {
        throw new AppError_1.default(401, "Invalid or expired refresh token");
    }
    await prisma_1.prisma.adminRefreshToken.update({
        where: { id: existing.id },
        data: { revokedAt: new Date() },
    });
    return { success: true };
};
exports.logout = logout;
const getProfile = async (adminId) => {
    const admin = await prisma_1.prisma.admin.findUnique({ where: { id: adminId } });
    if (!admin) {
        throw new AppError_1.default(404, "Admin not found");
    }
    return toPublicAdmin(admin);
};
exports.getProfile = getProfile;
const updateProfile = async (adminId, data) => {
    const admin = await prisma_1.prisma.admin.findUnique({ where: { id: adminId } });
    if (!admin) {
        throw new AppError_1.default(404, "Admin not found");
    }
    const updateData = {};
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
        updateData.password = await bcryptjs_1.default.hash(data.password, 10);
    }
    const updated = await prisma_1.prisma.admin.update({
        where: { id: adminId },
        data: updateData,
    });
    return toPublicAdmin(updated);
};
exports.updateProfile = updateProfile;
