import { Request, Response, NextFunction } from "express";
import {
  getDashboardStats,
  getUserGrowth,
  getUserOS,
  getAiUsers,
  getAppointments,
  getRetention,
  getUserListStats,
  getUserLocation,
  getDailyUsers,
  getRegisteredAnimals,
  getTaskFeatureUsers,
  getFarmersList,
  getDoctorsList,
  getDoctorById,
  deleteDoctor,
  getFarmerById,
  deleteFarmer,
} from "./dashboard.service";
import { sendResponse } from "../../utils/sendResponse";

type Period = "last_7_days" | "last_30_days" | "this_year";

const VALID_PERIODS: Period[] = ["last_7_days", "last_30_days", "this_year"];

function getPeriod(req: any): Period {
  const raw = (req.query.period as string) || "last_7_days";
  if (VALID_PERIODS.includes(raw as Period)) {
    return raw as Period;
  }
  return "last_7_days";
}

export const stats = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const period = getPeriod(req);
    const data = await getDashboardStats(period);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Dashboard stats retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const userGrowth = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const period = getPeriod(req);
    const data = await getUserGrowth(period);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User growth data retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const userOS = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const period = getPeriod(req);
    const data = await getUserOS(period);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User OS data retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const aiUsers = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const period = getPeriod(req);
    const data = await getAiUsers(period);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "AI user data retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const appointments = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const period = getPeriod(req);
    const data = await getAppointments(period);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Appointment data retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const retention = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const period = getPeriod(req);
    const data = await getRetention(period);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Retention data retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const userListStats = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const period = getPeriod(req);
    const data = await getUserListStats(period);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User list stats retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const userLocation = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const period = getPeriod(req);
    const role = (req.query.role as string) === "doctor" ? "doctor" : "farmer";
    const rawFilter = (req.query.filter as string) || "District";
    const validFilters: Array<"District" | "Upazila" | "Division"> = [
      "District",
      "Upazila",
      "Division",
    ];
    const filter = validFilters.includes(rawFilter as "District" | "Upazila" | "Division")
      ? (rawFilter as "District" | "Upazila" | "Division")
      : "District";
    const data = await getUserLocation(period, role, filter);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User location data retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const dailyUsers = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const period = getPeriod(req);
    const data = await getDailyUsers(period);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Daily user data retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const registeredAnimals = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const period = getPeriod(req);
    const data = await getRegisteredAnimals(period);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Registered animal data retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const taskFeatureUsers = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const period = getPeriod(req);
    const data = await getTaskFeatureUsers(period);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Task feature user data retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getFarmers = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "10", 10);
    const search = (req.query.search as string) || undefined;
    const status = (req.query.status as string) || undefined;

    const data = await getFarmersList(page, limit, search, status);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Farmers retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getDoctors = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "10", 10);
    const search = (req.query.search as string) || undefined;
    const status = (req.query.status as string) || undefined;

    const data = await getDoctorsList(page, limit, search, status);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Doctors retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getDoctor = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      sendResponse(res, {
        success: false,
        statusCode: 400,
        message: "Invalid doctor ID",
        data: null,
      });
      return;
    }

    const doctor = await getDoctorById(id);
    if (!doctor) {
      sendResponse(res, {
        success: false,
        statusCode: 404,
        message: "Doctor not found",
        data: null,
      });
      return;
    }

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Doctor retrieved successfully",
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDoctorById = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      sendResponse(res, {
        success: false,
        statusCode: 400,
        message: "Invalid doctor ID",
        data: null,
      });
      return;
    }

    await deleteDoctor(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Doctor deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const getFarmer = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      sendResponse(res, {
        success: false,
        statusCode: 400,
        message: "Invalid farmer ID",
        data: null,
      });
      return;
    }

    const farmer = await getFarmerById(id);
    if (!farmer) {
      sendResponse(res, {
        success: false,
        statusCode: 404,
        message: "Farmer not found",
        data: null,
      });
      return;
    }

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Farmer retrieved successfully",
      data: farmer,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFarmerById = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      sendResponse(res, {
        success: false,
        statusCode: 400,
        message: "Invalid farmer ID",
        data: null,
      });
      return;
    }

    await deleteFarmer(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Farmer deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
