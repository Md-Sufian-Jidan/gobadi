import { z } from "zod";
export const registerValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required").trim().optional(),
        firstName: z.string().min(1, "First name is required").trim().optional(),
        lastName: z.string().min(1, "Last name is required").trim().optional(),
        email: z.string().email("Please provide a valid email").trim(),
        phone: z.string().min(1, "Phone number is required").trim().optional(),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(100, "Password is too long"),
    }).refine((data) => data.name || (data.firstName && data.lastName), {
        message: "Name is required",
        path: ["name"],
    }),
});
export const loginValidationSchema = z.object({
    body: z.object({
        email: z.string().email("Please provide a valid email").trim(),
        password: z.string().min(1, "Password is required"),
    }),
});
export const forgotPasswordValidationSchema = z.object({
    body: z.object({
        email: z.string().email("Please provide a valid email").trim(),
    }),
});
export const resetPasswordValidationSchema = z.object({
    params: z.object({
        token: z.string().min(1, "Reset token is required"),
    }),
    body: z.object({
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(100, "Password is too long"),
    }),
});
