import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createAdminValidationSchema,
  updateAdminValidationSchema,
  deleteAdminValidationSchema,
  deactivateAdminValidationSchema,
} from "./admin.validation";
import {
  create,
  getAll,
  getById,
  update,
  remove,
  deactivate,
} from "./admin.controller";

const router = Router();

// All routes require authentication + super_admin role
router.use(authenticate);
router.use(authorize("super_admin"));

router.post(
  "/",
  validateRequest(createAdminValidationSchema),
  create
);

router.get("/", getAll);

router.get("/:id", getById);

router.put(
  "/:id",
  validateRequest(updateAdminValidationSchema),
  update
);

router.delete(
  "/:id",
  validateRequest(deleteAdminValidationSchema),
  remove
);

router.patch(
  "/:id/deactivate",
  validateRequest(deactivateAdminValidationSchema),
  deactivate
);

export const AdminRoutes = router;
