"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../../middlewares/auth");
const dashboard_controller_1 = require("./dashboard.controller");
const router = (0, express_1.Router)();
// All routes require authentication + admin role
router.use(auth_1.authenticate);
router.use((0, auth_1.authorize)("admin", "super_admin"));
router.get("/stats", dashboard_controller_1.stats);
router.get("/user-growth", dashboard_controller_1.userGrowth);
router.get("/user-os", dashboard_controller_1.userOS);
router.get("/ai-users", dashboard_controller_1.aiUsers);
router.get("/appointments", dashboard_controller_1.appointments);
router.get("/retention", dashboard_controller_1.retention);
// User List page endpoints
router.get("/user-list-stats", dashboard_controller_1.userListStats);
router.get("/user-location", dashboard_controller_1.userLocation);
router.get("/daily-users", dashboard_controller_1.dailyUsers);
router.get("/registered-animals", dashboard_controller_1.registeredAnimals);
router.get("/task-feature-users", dashboard_controller_1.taskFeatureUsers);
// Specific User Lists
router.get("/farmers", dashboard_controller_1.getFarmers);
router.get("/farmers/:id", dashboard_controller_1.getFarmer);
router.delete("/farmers/:id", dashboard_controller_1.deleteFarmerById);
router.get("/doctors", dashboard_controller_1.getDoctors);
router.get("/doctors/:id", dashboard_controller_1.getDoctor);
router.delete("/doctors/:id", dashboard_controller_1.deleteDoctorById);
exports.DashboardRoutes = router;
