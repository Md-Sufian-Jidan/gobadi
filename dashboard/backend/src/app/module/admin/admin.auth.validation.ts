import { z } from "zod";

export const adminLoginValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Please provide a valid email").trim(),
    password: z.string().min(1, "Password is required"),
  }),
});

export const adminSendOtpValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Please provide a valid email").trim(),
    purpose: z.enum(["verify", "reset"]).optional().default("verify"),
  }),
});

export const adminVerifyOtpValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Please provide a valid email").trim(),
    code: z.string().min(1, "OTP code is required"),
    purpose: z.enum(["verify", "reset"]).optional().default("verify"),
  }),
});

export const adminForgotPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Please provide a valid email").trim(),
  }),
});

export const adminResetPasswordValidationSchema = z.object({
  body: z.object({
    resetToken: z.string().min(1, "Reset token is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password is too long"),
  }),
});

export const adminRefreshTokenValidationSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, "Refresh token is required"),
  }),
});

export const adminUpdateProfileValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").trim().optional(),
    designation: z
      .enum([
        "founder",
        "co-founder",
        "manager",
        "developer",
        "analyst",
        "support",
      ])
      .optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password is too long")
      .optional(),
  }),
});
