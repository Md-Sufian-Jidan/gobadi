"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenValidationSchema = exports.facebookAuthValidationSchema = exports.googleAuthValidationSchema = exports.resetPasswordValidationSchema = exports.forgotPasswordValidationSchema = exports.verifyOtpValidationSchema = exports.sendOtpValidationSchema = exports.loginValidationSchema = exports.registerValidationSchema = void 0;
const zod_1 = require("zod");
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9]{7,15}$/;
const isPhoneOrEmail = (val) => EMAIL_REGEX.test(val) || PHONE_REGEX.test(val);
exports.registerValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string().min(1, "Name is required").trim(),
        identifier: zod_1.z
            .string()
            .min(1, "Phone number or email is required")
            .trim()
            .refine(isPhoneOrEmail, {
            message: "Must be a valid phone number or email address",
        }),
        password: zod_1.z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(100, "Password is too long"),
        role: zod_1.z.enum(["user", "doctor", "clinic", "admin"]).default("user"),
    }),
});
exports.loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        identifier: zod_1.z
            .string()
            .min(1, "Phone number or email is required")
            .trim()
            .refine(isPhoneOrEmail, {
            message: "Must be a valid phone number or email address",
        }),
        password: zod_1.z.string().min(1, "Password is required"),
    }),
});
exports.sendOtpValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        phone: zod_1.z
            .string()
            .min(1, "Phone number or email is required")
            .trim()
            .refine(isPhoneOrEmail, {
            message: "Must be a valid phone number or email address",
        }),
        purpose: zod_1.z.enum(["login", "verify", "reset"]).optional().default("login"),
    }),
});
exports.verifyOtpValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        phone: zod_1.z
            .string()
            .min(1, "Phone number or email is required")
            .trim()
            .refine(isPhoneOrEmail, {
            message: "Must be a valid phone number or email address",
        }),
        code: zod_1.z.string().min(1, "OTP code is required"),
        purpose: zod_1.z.enum(["login", "verify", "reset"]).optional().default("login"),
    }),
});
exports.forgotPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        identifier: zod_1.z
            .string()
            .min(1, "Phone number or email is required")
            .trim()
            .refine(isPhoneOrEmail, {
            message: "Must be a valid phone number or email address",
        }),
    }),
});
exports.resetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        resetToken: zod_1.z.string().min(1, "Reset token is required"),
        newPassword: zod_1.z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(100, "Password is too long"),
    }),
});
exports.googleAuthValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        idToken: zod_1.z.string().min(1, "Google ID token is required"),
    }),
});
exports.facebookAuthValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        accessToken: zod_1.z.string().min(1, "Facebook access token is required"),
    }),
});
exports.refreshTokenValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        refreshToken: zod_1.z.string().min(1, "Refresh token is required"),
    }),
});
