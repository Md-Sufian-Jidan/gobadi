import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.route";
import { UserRoutes } from "../module/user/user.route";
import { AdminRoutes } from "../module/admin/admin.route";

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
    {
        path: "/admins",
        route: AdminRoutes
    },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;