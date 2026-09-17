import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createNotificationValidationSchema,
  sendNotificationValidationSchema,
  broadcastNotificationValidationSchema,
  notificationParamsValidationSchema,
} from "./notification.validation";
import {
  create,
  send,
  getAll,
  getByUser,
  unreadCount,
  markRead,
  markAllRead,
  remove,
  broadcast,
  getOne,
} from "./notification.controller";

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get("/unread-count", unreadCount);

router.get("/", authorize("admin", "super_admin"), getAll);

router.get("/user", getByUser);

router.get("/:id", authorize("admin", "super_admin"), getOne);

router.post(
  "/",
  authorize("admin", "super_admin"),
  validateRequest(createNotificationValidationSchema),
  create
);

router.post(
  "/send",
  authorize("admin", "super_admin"),
  validateRequest(sendNotificationValidationSchema),
  send
);

router.post(
  "/broadcast",
  authorize("admin", "super_admin"),
  validateRequest(broadcastNotificationValidationSchema),
  broadcast
);

router.patch(
  "/:id/read",
  validateRequest(notificationParamsValidationSchema),
  markRead
);

router.patch("/read-all", markAllRead);

router.delete(
  "/:id",
  authorize("admin", "super_admin"),
  validateRequest(notificationParamsValidationSchema),
  remove
);

export const NotificationRoutes = router;
