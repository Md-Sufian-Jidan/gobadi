"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const search_service_1 = require("./search.service");
const sendResponse_1 = require("../../utils/sendResponse");
const search = async (req, res, next) => {
    try {
        const q = req.query.q || "";
        if (q.trim().length < 2) {
            (0, sendResponse_1.sendResponse)(res, {
                success: true,
                statusCode: 200,
                message: "Search query too short",
                data: { farmers: [], doctors: [], animals: [], notifications: [] },
            });
            return;
        }
        const data = await (0, search_service_1.globalSearch)(q);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Search results retrieved successfully",
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.search = search;
