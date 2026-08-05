import { Admin } from "./admin.model";
import { hashPassword } from "../../middlewares/password";
import AppError from "../../errors/AppError";
import { AdminRole, AdminDesignation, AdminStatus } from "./admin.interface";

export const createAdmin = async (data: {
  name: string;
  email: string;
  password: string;
  role?: AdminRole;
  designation: AdminDesignation;
  avatar?: string;
  status?: AdminStatus;
}) => {
  const email = data.email.trim().toLowerCase();

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    throw new AppError(409, "Admin with this email already exists");
  }

  const admin = await Admin.create({
    name: data.name.trim(),
    email,
    password: await hashPassword(data.password),
    role: data.role || AdminRole.ADMIN,
    designation: data.designation,
    avatar: data.avatar,
    status: data.status || AdminStatus.ACTIVE,
  });

  return sanitizeAdmin(admin);
};

export const getAllAdmins = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;

  const [admins, total] = await Promise.all([
    Admin.find().skip(skip).limit(limit).select("-password"),
    Admin.countDocuments(),
  ]);

  return {
    admins,
    pagination: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
  };
};

export const getAdminById = async (id: string) => {
  const admin = await Admin.findById(id).select("-password");
  if (!admin) {
    throw new AppError(404, "Admin not found");
  }
  return admin;
};

export const updateAdmin = async (
  id: string,
  data: Record<string, any>
) => {
  const admin = await Admin.findById(id).select("+password");
  if (!admin) {
    throw new AppError(404, "Admin not found");
  }

  if (data.email && data.email !== admin.email) {
    const existing = await Admin.findOne({ email: data.email.toLowerCase() });
    if (existing) {
      throw new AppError(409, "Email already in use");
    }
    data.email = data.email.toLowerCase();
  }

  if (data.password) {
    data.password = await hashPassword(data.password);
  }

  const updated = await Admin.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).select("-password");

  return updated;
};

export const deleteAdmin = async (id: string) => {
  const admin = await Admin.findByIdAndDelete(id);
  if (!admin) {
    throw new AppError(404, "Admin not found");
  }
  return null;
};

export const deactivateAdmin = async (id: string) => {
  const admin = await Admin.findById(id);
  if (!admin) {
    throw new AppError(404, "Admin not found");
  }

  admin.status = admin.status === AdminStatus.ACTIVE ? AdminStatus.DEACTIVE : AdminStatus.ACTIVE;
  await admin.save();

  return sanitizeAdmin(admin);
};

const sanitizeAdmin = (admin: any) => {
  const adminObject = admin.toObject ? admin.toObject() : admin;
  const { password, ...safeAdmin } = adminObject;
  return safeAdmin;
};
