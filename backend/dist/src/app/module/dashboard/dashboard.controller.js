"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFarmerById = exports.getFarmer = exports.deleteDoctorById = exports.getDoctor = exports.getDoctors = exports.getFarmers = exports.taskFeatureUsers = exports.registeredAnimals = exports.dailyUsers = exports.userLocation = exports.userListStats = exports.retention = exports.appointments = exports.aiUsers = exports.userOS = exports.userGrowth = exports.stats = void 0;
const dashboard_service_1 = require("./dashboard.service");
const sendResponse_1 = require("../../utils/sendResponse");
const VALID_PERIODS = ["last_7_days", "last_30_days", "this_year"];
function getPeriod(req) {
    const raw = req.query.period || "last_7_days";
    if (VALID_PERIODS.includes(raw)) {
        return raw;
    }
    return "last_7_days";
}
const stats = async (req, res, next) => {
    try {
        const period = getPeriod(req);
        const data = await (0, dashboard_service_1.getDashboardStats)(period);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Dashboard stats retrieved successfully",
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.stats = stats;
const userGrowth = async (req, res, next) => {
    try {
        const period = getPeriod(req);
        const data = await (0, dashboard_service_1.getUserGrowth)(period);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "User growth data retrieved successfully",
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.userGrowth = userGrowth;
const userOS = async (req, res, next) => {
    try {
        const period = getPeriod(req);
        const data = await (0, dashboard_service_1.getUserOS)(period);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "User OS data retrieved successfully",
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.userOS = userOS;
const aiUsers = async (req, res, next) => {
    try {
        const period = getPeriod(req);
        const data = await (0, dashboard_service_1.getAiUsers)(period);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "AI user data retrieved successfully",
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.aiUsers = aiUsers;
const appointments = async (req, res, next) => {
    try {
        const period = getPeriod(req);
        const data = await (0, dashboard_service_1.getAppointments)(period);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Appointment data retrieved successfully",
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.appointments = appointments;
const retention = async (req, res, next) => {
    try {
        const period = getPeriod(req);
        const data = await (0, dashboard_service_1.getRetention)(period);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Retention data retrieved successfully",
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.retention = retention;
const userListStats = async (req, res, next) => {
    try {
        const period = getPeriod(req);
        const data = await (0, dashboard_service_1.getUserListStats)(period);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "User list stats retrieved successfully",
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.userListStats = userListStats;
const userLocation = async (req, res, next) => {
    try {
        const period = getPeriod(req);
        const role = req.query.role === "doctor" ? "doctor" : "farmer";
        const rawFilter = req.query.filter || "District";
        const validFilters = [
            "District",
            "Upazila",
            "Division",
        ];
        const filter = validFilters.includes(rawFilter)
            ? rawFilter
            : "District";
        const data = await (0, dashboard_service_1.getUserLocation)(period, role, filter);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "User location data retrieved successfully",
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.userLocation = userLocation;
const dailyUsers = async (req, res, next) => {
    try {
        const period = getPeriod(req);
        const data = await (0, dashboard_service_1.getDailyUsers)(period);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Daily user data retrieved successfully",
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.dailyUsers = dailyUsers;
const registeredAnimals = async (req, res, next) => {
    try {
        const period = getPeriod(req);
        const data = await (0, dashboard_service_1.getRegisteredAnimals)(period);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Registered animal data retrieved successfully",
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.registeredAnimals = registeredAnimals;
const taskFeatureUsers = async (req, res, next) => {
    try {
        const period = getPeriod(req);
        const data = await (0, dashboard_service_1.getTaskFeatureUsers)(period);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Task feature user data retrieved successfully",
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.taskFeatureUsers = taskFeatureUsers;
const getFarmers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page || "1", 10);
        const limit = parseInt(req.query.limit || "10", 10);
        const search = req.query.search || undefined;
        const status = req.query.status || undefined;
        const data = await (0, dashboard_service_1.getFarmersList)(page, limit, search, status);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Farmers retrieved successfully",
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getFarmers = getFarmers;
const getDoctors = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page || "1", 10);
        const limit = parseInt(req.query.limit || "10", 10);
        const search = req.query.search || undefined;
        const status = req.query.status || undefined;
        const data = await (0, dashboard_service_1.getDoctorsList)(page, limit, search, status);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Doctors retrieved successfully",
            data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getDoctors = getDoctors;
const getDoctor = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: 400,
                message: "Invalid doctor ID",
                data: null,
            });
            return;
        }
        const doctor = await (0, dashboard_service_1.getDoctorById)(id);
        if (!doctor) {
            (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: 404,
                message: "Doctor not found",
                data: null,
            });
            return;
        }
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Doctor retrieved successfully",
            data: doctor,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getDoctor = getDoctor;
const deleteDoctorById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: 400,
                message: "Invalid doctor ID",
                data: null,
            });
            return;
        }
        await (0, dashboard_service_1.deleteDoctor)(id);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Doctor deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteDoctorById = deleteDoctorById;
const getFarmer = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: 400,
                message: "Invalid farmer ID",
                data: null,
            });
            return;
        }
        const farmer = await (0, dashboard_service_1.getFarmerById)(id);
        if (!farmer) {
            (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: 404,
                message: "Farmer not found",
                data: null,
            });
            return;
        }
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Farmer retrieved successfully",
            data: farmer,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getFarmer = getFarmer;
const deleteFarmerById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: 400,
                message: "Invalid farmer ID",
                data: null,
            });
            return;
        }
        await (0, dashboard_service_1.deleteFarmer)(id);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Farmer deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteFarmerById = deleteFarmerById;
