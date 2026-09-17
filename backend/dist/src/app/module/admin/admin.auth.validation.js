"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUpdateProfileValidationSchema = exports.adminRefreshTokenValidationSchema = exports.adminResetPasswordValidationSchema = exports.adminForgotPasswordValidationSchema = exports.adminVerifyOtpValidationSchema = exports.adminSendOtpValidationSchema = exports.adminLoginValidationSchema = void 0;
const zod_1 = require("zod");
exports.adminLoginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Please provide a valid email").trim(),
        password: zod_1.z.string().min(1, "Password is required"),
    }),
});
exports.adminSendOtpValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Please provide a valid email").trim(),
        purpose: zod_1.z.enum(["verify", "reset"]).optional().default("verify"),
    }),
});
exports.adminVerifyOtpValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Please provide a valid email").trim(),
        code: zod_1.z.string().min(1, "OTP code is required"),
        purpose: zod_1.z.enum(["verify", "reset"]).optional().default("verify"),
    }),
});
exports.adminForgotPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Please provide a valid email").trim(),
    }),
});
exports.adminResetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        resetToken: zod_1.z.string().min(1, "Reset token is required"),
        newPassword: zod_1.z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(100, "Password is too long"),
    }),
});
exports.adminRefreshTokenValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        refreshToken: zod_1.z.string().min(1, "Refresh token is required"),
    }),
});
exports.adminUpdateProfileValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required").trim().optional(),
        designation: zod_1.z
            .enum([
            "founder",
            "co-founder",
            "manager",
            "developer",
            "analyst",
            "support",
        ])
            .optional(),
        password: zod_1.z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(100, "Password is too long")
            .optional(),
    }),
});
