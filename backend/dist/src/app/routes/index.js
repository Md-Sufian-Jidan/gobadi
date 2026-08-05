import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.route";
import { UserRoutes } from "../module/user/user.route";
const router = Router();
const routes = [
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/users",
        route: UserRoutes
    },
];
routes.forEach((route) => router.use(route.path, route.route));
export default router;
