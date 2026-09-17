import { z } from "zod";
import { NOTIFICATION_TYPE_VALUES } from "./notification.interface";

const notificationTypeEnum = z.enum(NOTIFICATION_TYPE_VALUES as [string, ...string[]]);

export const createNotificationValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").trim(),
    body: z.string().min(1, "Body is required").trim(),
    type: notificationTypeEnum.default("system"),
    userId: z.number().int().positive("User ID must be a positive integer"),
    referenceType: z.string().optional(),
    referenceId: z.string().optional(),
  }),
});

export const sendNotificationValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").trim(),
    body: z.string().min(1, "Body is required").trim(),
    type: notificationTypeEnum.default("system"),
    userIds: z
      .array(z.number().int().positive())
      .min(1, "At least one user ID is required"),
    referenceType: z.string().optional(),
    referenceId: z.string().optional(),
  }),
});

export const broadcastNotificationValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").trim(),
    body: z.string().min(1, "Body is required").trim(),
    type: notificationTypeEnum.default("system"),
    role: z.enum(["user", "doctor", "clinic", "admin"]).optional(),
    occurrence: z.string().optional(),
    time: z.string().optional(),
  }),
});

export const notificationParamsValidationSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Notification ID is required"),
  }),
});
