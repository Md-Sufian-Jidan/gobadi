"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_validation_1 = require("./user.validation");
const auth_1 = require("../../middlewares/auth");
const upload_1 = require("../../middlewares/upload");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(auth_1.authenticate);
router.get("/", (0, auth_1.authorize)("admin", "super_admin"), user_controller_1.getAllUsers);
router.get("/:id", user_controller_1.getUserById);
router.put("/:id", upload_1.uploadImageMiddleware.single("avatar"), (0, validateRequest_1.validateRequest)(user_validation_1.updateUserValidationSchema), user_controller_1.updateUser);
router.delete("/:id", (0, auth_1.authorize)("admin", "super_admin"), user_controller_1.deleteUser);
exports.UserRoutes = router;
