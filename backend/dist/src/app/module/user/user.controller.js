import { User } from "./user.model";
import { sendResponse } from "../../utils/sendResponse";
import { hashPassword } from "../../middlewares/password";
import { UserRole } from "./user.interface";
const ALLOWED_UPDATE_FIELDS = ["name", "avatar", "password", "phone"];
const ADMIN_UPDATE_FIELDS = [...ALLOWED_UPDATE_FIELDS, "email", "role", "verified"];
export const getAllUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page || "1", 10);
        const limit = parseInt(req.query.limit || "10", 10);
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            User.find().skip(skip).limit(limit).select("-password"),
            User.countDocuments(),
        ]);
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Users retrieved successfully",
            data: {
                users,
                pagination: { page, limit, total, pages: Math.ceil(total / limit) },
            },
        });
    }
    catch (error) {
        next(error);
    }
};
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            sendResponse(res, {
                success: false,
                statusCode: 404,
                message: "User not found",
                data: null,
            });
            return;
        }
        if (req.user.role !== UserRole.ADMIN && user._id.toString() !== req.user.userId) {
            sendResponse(res, {
                success: false,
                statusCode: 403,
                message: "Access denied",
                data: null,
            });
            return;
        }
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "User retrieved successfully",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
};
export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            sendResponse(res, {
                success: false,
                statusCode: 404,
                message: "User not found",
                data: null,
            });
            return;
        }
        const isAdmin = req.user.role === UserRole.ADMIN;
        if (!isAdmin && user._id.toString() !== req.user.userId) {
            sendResponse(res, {
                success: false,
                statusCode: 403,
                message: "Access denied",
                data: null,
            });
            return;
        }
        const allowedFields = isAdmin ? ADMIN_UPDATE_FIELDS : ALLOWED_UPDATE_FIELDS;
        const sanitizedData = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                sanitizedData[field] = req.body[field];
            }
        }
        if (!isAdmin) {
            if (req.body.email !== undefined || req.body.role !== undefined) {
                sendResponse(res, {
                    success: false,
                    statusCode: 403,
                    message: "You can only update your profile details like name, avatar, phone, and password",
                    data: null,
                });
                return;
            }
        }
        if (sanitizedData.password) {
            sanitizedData.password = await hashPassword(sanitizedData.password);
        }
        const file = req.file;
        if (file?.filename) {
            sanitizedData.avatar = file.filename;
        }
        const updated = await User.findByIdAndUpdate(req.params.id, sanitizedData, {
            new: true,
            runValidators: true,
        }).select("-password");
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "User updated successfully",
            data: updated,
        });
    }
    catch (error) {
        next(error);
    }
};
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            sendResponse(res, {
                success: false,
                statusCode: 404,
                message: "User not found",
                data: null,
            });
            return;
        }
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "User deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
};
