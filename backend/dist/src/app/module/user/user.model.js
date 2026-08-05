import { Schema, model } from 'mongoose';
import { UserRole } from './user.interface';
const userSchema = new Schema({
    phone: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER,
    },
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        lowercase: true,
        trim: true,
    },
    avatar: {
        type: String,
    },
    password: {
        type: String,
        select: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    facebookId: {
        type: String,
        unique: true,
        sparse: true,
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
}, {
    timestamps: true,
    versionKey: false,
});
export const User = model('User', userSchema);
