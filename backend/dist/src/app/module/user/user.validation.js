import { z } from 'zod';
import { UserRole } from './user.interface';
export const createUserValidationSchema = z.object({
    phone: z
        .string()
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number is too long')
        .optional(),
    email: z
        .string()
        .email('Invalid email address')
        .optional(),
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name is too long')
        .optional(),
    avatar: z
        .string()
        .url('Invalid avatar URL')
        .optional(),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password is too long')
        .optional(),
    role: z
        .nativeEnum(UserRole)
        .default(UserRole.USER),
    verified: z
        .boolean()
        .default(false),
    googleId: z
        .string()
        .optional(),
    facebookId: z
        .string()
        .optional(),
});
export const updateUserValidationSchema = createUserValidationSchema.partial();
