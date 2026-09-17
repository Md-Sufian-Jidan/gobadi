import { Router } from "express";
import { adminAuthenticate, adminAuthorize } from "../../middlewares/adminAuth";
import { authenticate, authorize } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { authRateLimiter } from "../../middlewares/rateLimiter";
import { uploadImageMiddleware } from "../../middlewares/upload";
import {
  createAdminValidationSchema,
  updateAdminValidationSchema,
  deleteAdminValidationSchema,
  deactivateAdminValidationSchema,
} from "./admin.validation";
import {
  adminLoginValidationSchema,
  adminSendOtpValidationSchema,
  adminVerifyOtpValidationSchema,
  adminForgotPasswordValidationSchema,
  adminResetPasswordValidationSchema,
  adminRefreshTokenValidationSchema,
  adminUpdateProfileValidationSchema,
} from "./admin.auth.validation";
import {
  create,
  getAll,
  getById,
  update,
  remove,
  deactivate,
} from "./admin.controller";
import {
  loginHandler,
  sendOtpHandler,
  verifyOtpHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  refreshTokenHandler,
  logoutHandler,
  getProfileHandler,
  updateProfileHandler,
} from "./admin.auth.controller";

const router = Router();

router.post(
  "/login",
  authRateLimiter,
  validateRequest(adminLoginValidationSchema),
  loginHandler
);

router.post(
  "/send-otp",
  authRateLimiter,
  validateRequest(adminSendOtpValidationSchema),
  sendOtpHandler
);

router.post(
  "/verify-otp",
  authRateLimiter,
  validateRequest(adminVerifyOtpValidationSchema),
  verifyOtpHandler
);

router.post(
  "/forgot-password",
  authRateLimiter,
  validateRequest(adminForgotPasswordValidationSchema),
  forgotPasswordHandler
);

router.post(
  "/reset-password",
  authRateLimiter,
  validateRequest(adminResetPasswordValidationSchema),
  resetPasswordHandler
);

router.post(
  "/refresh",
  validateRequest(adminRefreshTokenValidationSchema),
  refreshTokenHandler
);

// ========== Admin Auth Routes (auth required) ==========

router.post(
  "/logout",
  adminAuthenticate,
  validateRequest(adminRefreshTokenValidationSchema),
  logoutHandler
);

router.get("/profile", adminAuthenticate, getProfileHandler);

router.patch(
  "/profile",
  adminAuthenticate,
  uploadImageMiddleware.single("avatar"),
  validateRequest(adminUpdateProfileValidationSchema),
  updateProfileHandler
);

// ========== Admin CRUD Routes (super_admin only) ==========

router.post(
  "/",
  authenticate,
  authorize("super_admin"),
  validateRequest(createAdminValidationSchema),
  create
);

router.get(
  "/",
  authenticate,
  authorize("super_admin"),
  getAll
);

router.get(
  "/:id",
  authenticate,
  authorize("super_admin"),
  getById
);

router.put(
  "/:id",
  authenticate,
  authorize("super_admin"),
  validateRequest(updateAdminValidationSchema),
  update
);

router.delete(
  "/:id",
  authenticate,
  authorize("super_admin"),
  validateRequest(deleteAdminValidationSchema),
  remove
);

router.patch(
  "/:id/deactivate",
  authenticate,
  authorize("super_admin"),
  validateRequest(deactivateAdminValidationSchema),
  deactivate
);

export const AdminRoutes = router;
