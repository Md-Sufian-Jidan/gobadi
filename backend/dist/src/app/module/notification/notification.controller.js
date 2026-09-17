"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOne = exports.broadcast = exports.remove = exports.markAllRead = exports.markRead = exports.unreadCount = exports.getByUser = exports.getAll = exports.send = exports.create = void 0;
const notification_service_1 = require("./notification.service");
const sendResponse_1 = require("../../utils/sendResponse");
const getParamId = (id) => {
    const raw = Array.isArray(id) ? id[0] : id;
    return parseInt(raw, 10);
};
const create = async (req, res, next) => {
    try {
        const result = await (0, notification_service_1.createNotification)(req.body);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 201,
            message: "Notification created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
const send = async (req, res, next) => {
    try {
        const { title, body, type, userIds, referenceType, referenceId } = req.body;
        const result = await (0, notification_service_1.sendToUsers)(userIds, title, body, type, referenceType, referenceId);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 201,
            message: `Notification sent to ${result.count} users`,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.send = send;
const getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page || "1", 10);
        const limit = parseInt(req.query.limit || "20", 10);
        const search = req.query.search || undefined;
        const type = req.query.type || undefined;
        const result = await (0, notification_service_1.getAllNotifications)(page, limit, search, type);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Notifications retrieved successfully",
            data: result.notifications,
            meta: result.pagination,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAll = getAll;
const getByUser = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page || "1", 10);
        const limit = parseInt(req.query.limit || "20", 10);
        const result = await (0, notification_service_1.getNotificationsByUser)(req.user.sub, page, limit);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Notifications retrieved successfully",
            data: result.notifications,
            meta: result.pagination,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getByUser = getByUser;
const unreadCount = async (req, res, next) => {
    try {
        const count = await (0, notification_service_1.getUnreadCount)();
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Unread count retrieved successfully",
            data: { count },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.unreadCount = unreadCount;
const markRead = async (req, res, next) => {
    try {
        const id = getParamId(req.params.id);
        if (isNaN(id)) {
            (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: 400,
                message: "Invalid notification ID",
                data: null,
            });
            return;
        }
        const result = await (0, notification_service_1.markAsRead)(id, req.user.sub);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Notification marked as read",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.markRead = markRead;
const markAllRead = async (req, res, next) => {
    try {
        const result = await (0, notification_service_1.markAllAsRead)(req.user.sub);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "All notifications marked as read",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.markAllRead = markAllRead;
const remove = async (req, res, next) => {
    try {
        const id = getParamId(req.params.id);
        if (isNaN(id)) {
            (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: 400,
                message: "Invalid notification ID",
                data: null,
            });
            return;
        }
        await (0, notification_service_1.deleteNotification)(id);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Notification deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.remove = remove;
const broadcast = async (req, res, next) => {
    try {
        const result = await (0, notification_service_1.broadcastNotification)(req.body);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 201,
            message: `Notification broadcasted to ${result.count} users`,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.broadcast = broadcast;
const getOne = async (req, res, next) => {
    try {
        const id = getParamId(req.params.id);
        if (isNaN(id)) {
            (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: 400,
                message: "Invalid notification ID",
                data: null,
            });
            return;
        }
        const notification = await (0, notification_service_1.getNotificationById)(id);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Notification retrieved successfully",
            data: notification,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getOne = getOne;
