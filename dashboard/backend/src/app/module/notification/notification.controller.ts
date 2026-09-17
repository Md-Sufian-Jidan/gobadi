import { Request, Response, NextFunction } from "express";
import {
  createNotification,
  sendToUsers,
  getAllNotifications,
  getNotificationsByUser,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  broadcastNotification,
  getNotificationById,
} from "./notification.service";
import { sendResponse } from "../../utils/sendResponse";

const getParamId = (id: string | string[]): number => {
  const raw = Array.isArray(id) ? id[0] : id;
  return parseInt(raw, 10);
};

export const create = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const result = await createNotification(req.body);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Notification created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const send = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const { title, body, type, userIds, referenceType, referenceId } = req.body;
    const result = await sendToUsers(userIds, title, body, type, referenceType, referenceId);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: `Notification sent to ${result.count} users`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "20", 10);
    const search = (req.query.search as string) || undefined;
    const type = (req.query.type as string) || undefined;
    const result = await getAllNotifications(page, limit, search, type);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Notifications retrieved successfully",
      data: result.notifications,
      meta: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getByUser = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "20", 10);
    const result = await getNotificationsByUser(req.user!.sub, page, limit);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Notifications retrieved successfully",
      data: result.notifications,
      meta: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const unreadCount = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const count = await getUnreadCount();
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Unread count retrieved successfully",
      data: { count },
    });
  } catch (error) {
    next(error);
  }
};

export const markRead = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const id = getParamId(req.params.id);
    if (isNaN(id)) {
      sendResponse(res, {
        success: false,
        statusCode: 400,
        message: "Invalid notification ID",
        data: null,
      });
      return;
    }
    const result = await markAsRead(id, req.user!.sub);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Notification marked as read",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const markAllRead = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const result = await markAllAsRead(req.user!.sub);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All notifications marked as read",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const id = getParamId(req.params.id);
    if (isNaN(id)) {
      sendResponse(res, {
        success: false,
        statusCode: 400,
        message: "Invalid notification ID",
        data: null,
      });
      return;
    }
    await deleteNotification(id);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Notification deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const broadcast = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const result = await broadcastNotification(req.body);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: `Notification broadcasted to ${result.count} users`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const id = getParamId(req.params.id);
    if (isNaN(id)) {
      sendResponse(res, {
        success: false,
        statusCode: 400,
        message: "Invalid notification ID",
        data: null,
      });
      return;
    }

    const notification = await getNotificationById(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Notification retrieved successfully",
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};
