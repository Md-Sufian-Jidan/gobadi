import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth";
import { search } from "./search.controller";

const router = Router();

router.use(authenticate);
router.use(authorize("admin", "super_admin"));

router.get("/", search);

export const SearchRoutes = router;
