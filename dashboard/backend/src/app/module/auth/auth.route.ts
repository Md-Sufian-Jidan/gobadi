import { Router } from "express";
import { authenticate } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { authRateLimiter } from "../../middlewares/rateLimiter";
import {
  registerValidationSchema,
  loginValidationSchema,
  sendOtpValidationSchema,
  verifyOtpValidationSchema,
  forgotPasswordValidationSchema,
  resetPasswordValidationSchema,
  googleAuthValidationSchema,
  facebookAuthValidationSchema,
  refreshTokenValidationSchema,
} from "./auth.validation";
import {
  registerHandler,
  loginHandler,
  sendOtpHandler,
  verifyOtpHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  googleAuthHandler,
  facebookAuthHandler,
  refreshTokenHandler,
  logoutHandler,
  getProfileHandler,
} from "./auth.controller";

const router = Router();

router.post(
  "/register",
  authRateLimiter,
  validateRequest(registerValidationSchema),
  registerHandler
);

router.post(
  "/login",
  authRateLimiter,
  validateRequest(loginValidationSchema),
  loginHandler
);

router.post(
  "/send-otp",
  authRateLimiter,
  validateRequest(sendOtpValidationSchema),
  sendOtpHandler
);

router.post(
  "/verify-otp",
  authRateLimiter,
  validateRequest(verifyOtpValidationSchema),
  verifyOtpHandler
);

router.post(
  "/forgot-password",
  authRateLimiter,
  validateRequest(forgotPasswordValidationSchema),
  forgotPasswordHandler
);

router.post(
  "/reset-password",
  authRateLimiter,
  validateRequest(resetPasswordValidationSchema),
  resetPasswordHandler
);

router.post(
  "/oauth/google",
  authRateLimiter,
  validateRequest(googleAuthValidationSchema),
  googleAuthHandler
);

router.post(
  "/oauth/facebook",
  authRateLimiter,
  validateRequest(facebookAuthValidationSchema),
  facebookAuthHandler
);

router.post(
  "/refresh",
  validateRequest(refreshTokenValidationSchema),
  refreshTokenHandler
);

router.post(
  "/logout",
  authenticate,
  validateRequest(refreshTokenValidationSchema),
  logoutHandler
);

router.get("/profile", authenticate, getProfileHandler);

export const AuthRoutes = router;
