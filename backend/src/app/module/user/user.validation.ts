import { z } from "zod";

export const updateUserValidationSchema = z.object({
  params: z.object({
    id: z.string().min(1, "User ID is required"),
  }),
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name is too long")
      .optional(),
    email: z.string().email("Invalid email address").optional(),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number is too long")
      .optional(),
    avatar: z.string().url("Invalid avatar URL").optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password is too long")
      .optional(),
    role: z.enum(["user", "doctor", "clinic", "admin"]).optional(),
    verified: z.boolean().optional(),
  }),
});

export type UpdateUserInput = z.infer<typeof updateUserValidationSchema>;
