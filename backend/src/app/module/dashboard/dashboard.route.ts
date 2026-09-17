import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth";
import {
  stats,
  userGrowth,
  userOS,
  aiUsers,
  appointments,
  retention,
  userListStats,
  userLocation,
  dailyUsers,
  registeredAnimals,
  taskFeatureUsers,
  getFarmers,
  getDoctors,
  getDoctor,
  deleteDoctorById,
  getFarmer,
  deleteFarmerById,
} from "./dashboard.controller";

const router = Router();

// All routes require authentication + admin role
router.use(authenticate);
router.use(authorize("admin", "super_admin"));

router.get("/stats", stats);
router.get("/user-growth", userGrowth);
router.get("/user-os", userOS);
router.get("/ai-users", aiUsers);
router.get("/appointments", appointments);
router.get("/retention", retention);

// User List page endpoints
router.get("/user-list-stats", userListStats);
router.get("/user-location", userLocation);
router.get("/daily-users", dailyUsers);
router.get("/registered-animals", registeredAnimals);
router.get("/task-feature-users", taskFeatureUsers);

// Specific User Lists
router.get("/farmers", getFarmers);
router.get("/farmers/:id", getFarmer);
router.delete("/farmers/:id", deleteFarmerById);
router.get("/doctors", getDoctors);
router.get("/doctors/:id", getDoctor);
router.delete("/doctors/:id", deleteDoctorById);

export const DashboardRoutes = router;
