"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../module/auth/auth.route");
const user_route_1 = require("../module/user/user.route");
const admin_route_1 = require("../module/admin/admin.route");
const notification_route_1 = require("../module/notification/notification.route");
const dashboard_route_1 = require("../module/dashboard/dashboard.route");
const animal_route_1 = require("../module/animal/animal.route");
const search_route_1 = require("../module/search/search.route");
const router = (0, express_1.Router)();
const routes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes
    },
    {
        path: "/users",
        route: user_route_1.UserRoutes
    },
    {
        path: "/admins",
        route: admin_route_1.AdminRoutes
    },
    {
        path: "/notifications",
        route: notification_route_1.NotificationRoutes
    },
    {
        path: "/dashboard",
        route: dashboard_route_1.DashboardRoutes
    },
    {
        path: "/animals",
        route: animal_route_1.AnimalRoutes
    },
    {
        path: "/search",
        route: search_route_1.SearchRoutes
    },
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
