import { Schema, model } from "mongoose";
import {
  AdminDesignation,
  AdminModel,
  AdminRole,
  AdminStatus,
  IAdmin,
} from "./admin.interface";

const adminSchema = new Schema<IAdmin, AdminModel>(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(AdminRole),
      default: AdminRole.ADMIN,
    },
    designation: {
      type: String,
      enum: Object.values(AdminDesignation),
      required: [true, "Designation is required"],
    },
    avatar: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(AdminStatus),
      default: AdminStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Admin = model<IAdmin, AdminModel>("Admin", adminSchema);
