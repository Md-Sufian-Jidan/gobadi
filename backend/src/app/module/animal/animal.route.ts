import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth";
import { listAnimals, getAnimal, deleteAnimal } from "./animal.controller";

const router = Router();

router.use(authenticate);
router.use(authorize("admin", "super_admin"));

router.get("/", listAnimals);
router.get("/:id", getAnimal);
router.delete("/:id", deleteAnimal);

export const AnimalRoutes = router;
