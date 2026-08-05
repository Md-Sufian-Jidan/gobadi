import { Model } from 'mongoose';

export enum UserRole {
  USER = 'user',
  DOCTOR = 'doctor',
  CLINIC = 'clinic',
  ADMIN = 'admin',
}

export interface IUser {
  phone?: string;
  role: UserRole;
  name?: string;
  email: string;
  avatar?: string;
  password: string;
  verified: boolean;
  googleId?: string;
  facebookId?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<IUser> { }