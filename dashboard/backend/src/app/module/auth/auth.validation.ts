import { z } from "zod";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9]{7,15}$/;

const isPhoneOrEmail = (val: string) =>
  EMAIL_REGEX.test(val) || PHONE_REGEX.test(val);

export const registerValidationSchema = z.object({
  body: z
    .object({
      name: z.string().min(1, "Name is required").trim(),
      identifier: z
        .string()
        .min(1, "Phone number or email is required")
        .trim()
        .refine(isPhoneOrEmail, {
          message: "Must be a valid phone number or email address",
        }),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password is too long"),
      role: z.enum(["user", "doctor", "clinic", "admin"]).default("user"),
    }),
});

export const loginValidationSchema = z.object({
  body: z.object({
    identifier: z
      .string()
      .min(1, "Phone number or email is required")
      .trim()
      .refine(isPhoneOrEmail, {
        message: "Must be a valid phone number or email address",
      }),
    password: z.string().min(1, "Password is required"),
  }),
});

export const sendOtpValidationSchema = z.object({
  body: z.object({
    phone: z
      .string()
      .min(1, "Phone number or email is required")
      .trim()
      .refine(isPhoneOrEmail, {
        message: "Must be a valid phone number or email address",
      }),
    purpose: z.enum(["login", "verify", "reset"]).optional().default("login"),
  }),
});

export const verifyOtpValidationSchema = z.object({
  body: z.object({
    phone: z
      .string()
      .min(1, "Phone number or email is required")
      .trim()
      .refine(isPhoneOrEmail, {
        message: "Must be a valid phone number or email address",
      }),
    code: z.string().min(1, "OTP code is required"),
    purpose: z.enum(["login", "verify", "reset"]).optional().default("login"),
  }),
});

export const forgotPasswordValidationSchema = z.object({
  body: z.object({
    identifier: z
      .string()
      .min(1, "Phone number or email is required")
      .trim()
      .refine(isPhoneOrEmail, {
        message: "Must be a valid phone number or email address",
      }),
  }),
});

export const resetPasswordValidationSchema = z.object({
  body: z.object({
    resetToken: z.string().min(1, "Reset token is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password is too long"),
  }),
});

export const googleAuthValidationSchema = z.object({
  body: z.object({
    idToken: z.string().min(1, "Google ID token is required"),
  }),
});

export const facebookAuthValidationSchema = z.object({
  body: z.object({
    accessToken: z.string().min(1, "Facebook access token is required"),
  }),
});

export const refreshTokenValidationSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, "Refresh token is required"),
  }),
});
