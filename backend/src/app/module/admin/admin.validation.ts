import { z } from "zod";

export const createAdminValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").trim(),
    email: z.string().email("Please provide a valid email").trim(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password is too long"),
    role: z.enum(["admin", "super_admin"]).default("admin"),
    designation: z.enum(
      ["founder", "co-founder", "manager", "developer", "analyst", "support"],
      { message: "Invalid designation" }
    ),
    avatar: z.string().url("Invalid avatar URL").optional(),
    status: z.enum(["active", "deactive"]).default("active"),
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
    role: z.enum(["admin", "super_admin"]).optional(),
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
    avatar: z.string().url("Invalid avatar URL").optional(),
    status: z.enum(["active", "deactive"]).optional(),
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
