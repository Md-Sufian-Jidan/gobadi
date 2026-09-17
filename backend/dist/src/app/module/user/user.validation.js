"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidationSchema = void 0;
const zod_1 = require("zod");
exports.updateUserValidationSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "User ID is required"),
    }),
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(2, "Name must be at least 2 characters")
            .max(100, "Name is too long")
            .optional(),
        email: zod_1.z.string().email("Invalid email address").optional(),
        phone: zod_1.z
            .string()
            .min(10, "Phone number must be at least 10 digits")
            .max(15, "Phone number is too long")
            .optional(),
        avatar: zod_1.z.string().url("Invalid avatar URL").optional(),
        password: zod_1.z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(100, "Password is too long")
            .optional(),
        role: zod_1.z.enum(["user", "doctor", "clinic", "admin"]).optional(),
        verified: zod_1.z.boolean().optional(),
    }),
});
