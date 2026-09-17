"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivateAdminValidationSchema = exports.deleteAdminValidationSchema = exports.updateAdminValidationSchema = exports.createAdminValidationSchema = void 0;
const zod_1 = require("zod");
exports.createAdminValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required").trim(),
        email: zod_1.z.string().email("Please provide a valid email").trim(),
        password: zod_1.z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(100, "Password is too long"),
        role: zod_1.z.enum(["admin", "super_admin"]).default("admin"),
        designation: zod_1.z.enum(["founder", "co-founder", "manager", "developer", "analyst", "support"], { message: "Invalid designation" }),
        avatar: zod_1.z.string().url("Invalid avatar URL").optional(),
        status: zod_1.z.enum(["active", "deactive"]).default("active"),
    }),
});
exports.updateAdminValidationSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "Admin ID is required"),
    }),
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required").trim().optional(),
        email: zod_1.z.string().email("Please provide a valid email").trim().optional(),
        password: zod_1.z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(100, "Password is too long")
            .optional(),
        role: zod_1.z.enum(["admin", "super_admin"]).optional(),
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
        avatar: zod_1.z.string().url("Invalid avatar URL").optional(),
        status: zod_1.z.enum(["active", "deactive"]).optional(),
    }),
});
exports.deleteAdminValidationSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "Admin ID is required"),
    }),
});
exports.deactivateAdminValidationSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "Admin ID is required"),
    }),
});
