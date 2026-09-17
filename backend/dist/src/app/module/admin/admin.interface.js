"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminStatus = exports.AdminDesignation = exports.AdminRole = void 0;
var AdminRole;
(function (AdminRole) {
    AdminRole["ADMIN"] = "admin";
    AdminRole["SUPER_ADMIN"] = "super_admin";
})(AdminRole || (exports.AdminRole = AdminRole = {}));
var AdminDesignation;
(function (AdminDesignation) {
    AdminDesignation["FOUNDER"] = "founder";
    AdminDesignation["CO_FOUNDER"] = "co-founder";
    AdminDesignation["MANAGER"] = "manager";
    AdminDesignation["DEVELOPER"] = "developer";
    AdminDesignation["ANALYST"] = "analyst";
    AdminDesignation["SUPPORT"] = "support";
})(AdminDesignation || (exports.AdminDesignation = AdminDesignation = {}));
var AdminStatus;
(function (AdminStatus) {
    AdminStatus["ACTIVE"] = "active";
    AdminStatus["DEACTIVE"] = "deactive";
})(AdminStatus || (exports.AdminStatus = AdminStatus = {}));
