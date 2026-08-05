import { z } from "zod";
import { AdminRole, AdminDesignation, AdminStatus } from "./admin.interface";

export const createAdminValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").trim(),
    email: z.string().email("Please provide a valid email").trim(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password is too long"),
    role: z.nativeEnum(AdminRole).default(AdminRole.ADMIN),
    designation: z.nativeEnum(AdminDesignation, {
      message: "Invalid designation",
    }),
    avatar: z.string().url("Invalid avatar URL").optional(),
    status: z.nativeEnum(AdminStatus).default(AdminStatus.ACTIVE),
  }),
});

export const updateAdminValidationSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Admin ID is required"),
  }),
  body: z.object({
    name: z.string().min(1, "Name is required").trim().optional(),
    email: z.string().email("Please provide a valid email").trim().optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password is too long")
      .optional(),
    role: z.nativeEnum(AdminRole).optional(),
    designation: z.nativeEnum(AdminDesignation).optional(),
    avatar: z.string().url("Invalid avatar URL").optional(),
    status: z.nativeEnum(AdminStatus).optional(),
  }),
});

export const deleteAdminValidationSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Admin ID is required"),
  }),
});

export const deactivateAdminValidationSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Admin ID is required"),
  }),
});
