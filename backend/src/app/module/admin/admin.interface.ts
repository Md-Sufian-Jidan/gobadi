import { Model } from "mongoose";

export enum AdminRole {
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}

export enum AdminDesignation {
  FOUNDER = "founder",
  CO_FOUNDER = "co-founder",
  MANAGER = "manager",
  DEVELOPER = "developer",
  ANALYST = "analyst",
  SUPPORT = "support",
}

export enum AdminStatus {
  ACTIVE = "active",
  DEACTIVE = "deactive",
}

export interface IAdmin {
  name: string;
  email: string;
  password: string;
  role: AdminRole;
  designation: AdminDesignation;
  avatar?: string;
  status: AdminStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AdminModel extends Model<IAdmin> {}
