import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../user/user.model";
import { env } from "../../config/env";
import { sendEmail } from "../../utils/sendEmail";
import { UserRole } from "../user/user.interface";
import { comparePassword, hashPassword } from "../../middlewares/password";
const generateTokens = (payload) => {
    const token = jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN,
    });
    const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
        expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    });
    return { token, refreshToken };
};
const sanitizeUser = (user) => {
    const userObject = user.toObject ? user.toObject() : user;
    const { password, passwordResetToken, passwordResetExpires, ...safeUser } = userObject;
    return safeUser;
};
export const registerUser = async (data) => {
    const email = data.email.trim().toLowerCase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    const resolvedName = data.name?.trim() || [data.firstName, data.lastName].filter(Boolean).join(" ").trim();
    const user = await User.create({
        name: resolvedName,
        email,
        phone: data.phone,
        password: await hashPassword(data.password),
        role: data.role || UserRole.USER,
        verified: false,
    });
    const tokens = generateTokens({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
    });
    return { user: sanitizeUser(user), ...tokens };
};
export const loginUser = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select("+password");
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }
    const tokens = generateTokens({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
    });
    return { user: sanitizeUser(user), ...tokens };
};
export const forgotPassword = async (email) => {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
        return { message: "User does not exist" };
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save({ validateBeforeSave: false });
    const resetLink = `${env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    try {
        await sendEmail({
            to: normalizedEmail,
            subject: "Reset Your Password",
            html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #f9fafb; padding: 40px 20px;">
          <div style="background: #ffffff; border-radius: 10px; padding: 40px; border: 1px solid #e5e7eb;">
            <h2 style="margin: 0; color: #111827; text-align: center;">Reset Your Password</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-top: 24px;">
              We received a request to reset your password. Click the button below to create a new password.
            </p>
            <div style="text-align: center; margin: 35px 0;">
              <a href="${resetLink}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 16px; font-weight: 600;">Reset Password</a>
            </div>
          </div>
        </div>
      `,
        });
    }
    catch (error) {
        console.error("Failed to send password reset email:", error);
    }
    return {
        message: "Reset link has been sent to your mail address",
    };
};
export const resetPassword = async (token, newPassword) => {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    }).select("+passwordResetToken +passwordResetExpires");
    if (!user) {
        throw new Error("Invalid or expired reset token");
    }
    user.password = await hashPassword(newPassword);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    return generateTokens({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
    });
};
export const refreshAccessToken = async (refreshToken) => {
    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
        throw new Error("User not found");
    }
    return generateTokens({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
    });
};
export const logout = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    return { success: true };
};
export const getProfile = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    return sanitizeUser(user);
};
