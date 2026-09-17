"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationParamsValidationSchema = exports.broadcastNotificationValidationSchema = exports.sendNotificationValidationSchema = exports.createNotificationValidationSchema = void 0;
const zod_1 = require("zod");
const notification_interface_1 = require("./notification.interface");
const notificationTypeEnum = zod_1.z.enum(notification_interface_1.NOTIFICATION_TYPE_VALUES);
exports.createNotificationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required").trim(),
        body: zod_1.z.string().min(1, "Body is required").trim(),
        type: notificationTypeEnum.default("system"),
        userId: zod_1.z.number().int().positive("User ID must be a positive integer"),
        referenceType: zod_1.z.string().optional(),
        referenceId: zod_1.z.string().optional(),
    }),
});
exports.sendNotificationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required").trim(),
        body: zod_1.z.string().min(1, "Body is required").trim(),
        type: notificationTypeEnum.default("system"),
        userIds: zod_1.z
            .array(zod_1.z.number().int().positive())
            .min(1, "At least one user ID is required"),
        referenceType: zod_1.z.string().optional(),
        referenceId: zod_1.z.string().optional(),
    }),
});
exports.broadcastNotificationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required").trim(),
        body: zod_1.z.string().min(1, "Body is required").trim(),
        type: notificationTypeEnum.default("system"),
        role: zod_1.z.enum(["user", "doctor", "clinic", "admin"]).optional(),
        occurrence: zod_1.z.string().optional(),
        time: zod_1.z.string().optional(),
    }),
});
exports.notificationParamsValidationSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "Notification ID is required"),
    }),
});
