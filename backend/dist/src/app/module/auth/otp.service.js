"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOtp = exports.getOtp = exports.storeOtp = void 0;
const upstash_1 = require("../../config/upstash");
// In-memory fallback if Redis is unavailable
const otpMemoryFallback = new Map();
const storeOtp = async (phone, code, purpose, ttlSeconds = 300) => {
    const record = { code, purpose };
    try {
        await upstash_1.redis.set(`otp:${phone}`, JSON.stringify(record), { ex: ttlSeconds });
    }
    catch {
        // Fallback to in-memory store
        otpMemoryFallback.set(phone, {
            record,
            expiresAt: Date.now() + ttlSeconds * 1000,
        });
    }
};
exports.storeOtp = storeOtp;
const getOtp = async (phone) => {
    try {
        const raw = await upstash_1.redis.get(`otp:${phone}`);
        if (raw) {
            const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
            if (parsed && typeof parsed.code === 'string' && typeof parsed.purpose === 'string') {
                return parsed;
            }
        }
    }
    catch {
        // Fallback lookup
    }
    // Fallback: check in-memory
    const entry = otpMemoryFallback.get(phone);
    if (entry && entry.expiresAt > Date.now()) {
        return entry.record;
    }
    return null;
};
exports.getOtp = getOtp;
const deleteOtp = async (phone) => {
    try {
        await upstash_1.redis.del(`otp:${phone}`);
    }
    catch {
        // ignore
    }
    otpMemoryFallback.delete(phone);
};
exports.deleteOtp = deleteOtp;
