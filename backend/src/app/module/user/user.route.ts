import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { updateUserValidationSchema } from "./user.validation";
import { authenticate, authorize } from "../../middlewares/auth";
import { uploadImageMiddleware } from "../../middlewares/upload";

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get("/", authorize("admin"), getAllUsers);
router.get("/:id", getUserById);

router.put(
  "/:id",
  uploadImageMiddleware.single("avatar"),
  validateRequest(updateUserValidationSchema),
  updateUser
);

router.delete("/:id", authorize("admin"), deleteUser);

export const UserRoutes = router;
