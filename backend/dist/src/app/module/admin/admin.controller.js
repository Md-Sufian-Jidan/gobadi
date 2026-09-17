"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const admin_service_1 = require("./admin.service");
const sendResponse_1 = require("../../utils/sendResponse");
const getParamId = (id) => {
    const raw = Array.isArray(id) ? id[0] : id;
    return parseInt(raw, 10);
};
const create = async (req, res, next) => {
    try {
        const result = await (0, admin_service_1.createAdmin)(req.body);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 201,
            message: "Admin created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
const getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page || "1", 10);
        const limit = parseInt(req.query.limit || "10", 10);
        const result = await (0, admin_service_1.getAllAdmins)(page, limit);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Admins retrieved successfully",
            data: result.admins,
            meta: result.pagination,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAll = getAll;
const getById = async (req, res, next) => {
    try {
        const id = getParamId(req.params.id);
        if (isNaN(id)) {
            (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: 400,
                message: "Invalid admin ID",
                data: null,
            });
            return;
        }
        const result = await (0, admin_service_1.getAdminById)(id);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Admin retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getById = getById;
const update = async (req, res, next) => {
    try {
        const id = getParamId(req.params.id);
        if (isNaN(id)) {
            (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: 400,
                message: "Invalid admin ID",
                data: null,
            });
            return;
        }
        const result = await (0, admin_service_1.updateAdmin)(id, req.body);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Admin updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
const remove = async (req, res, next) => {
    try {
        const id = getParamId(req.params.id);
        if (isNaN(id)) {
            (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: 400,
                message: "Invalid admin ID",
                data: null,
            });
            return;
        }
        await (0, admin_service_1.deleteAdmin)(id);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Admin deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.remove = remove;
const deactivate = async (req, res, next) => {
    try {
        const id = getParamId(req.params.id);
        if (isNaN(id)) {
            (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: 400,
                message: "Invalid admin ID",
                data: null,
            });
            return;
        }
        const result = await (0, admin_service_1.deactivateAdmin)(id);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Admin status toggled successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deactivate = deactivate;
