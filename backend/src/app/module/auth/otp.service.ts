import { redis } from '../../config/upstash';

export type OtpPurpose = 'login' | 'verify' | 'reset';

interface OtpRecord {
  code: string;
  purpose: OtpPurpose;
}

// In-memory fallback if Redis is unavailable
const otpMemoryFallback = new Map<string, { record: OtpRecord; expiresAt: number }>();

export const storeOtp = async (
  phone: string,
  code: string,
  purpose: OtpPurpose,
  ttlSeconds: number = 300
): Promise<void> => {
  const record: OtpRecord = { code, purpose };

  try {
    await redis.set(`otp:${phone}`, JSON.stringify(record), { ex: ttlSeconds });
  } catch {
    // Fallback to in-memory store
    otpMemoryFallback.set(phone, {
      record,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }
};

export const getOtp = async (phone: string): Promise<OtpRecord | null> => {
  try {
    const raw = await redis.get<string>(`otp:${phone}`);
    if (raw) {
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (parsed && typeof parsed.code === 'string' && typeof parsed.purpose === 'string') {
        return parsed as OtpRecord;
      }
    }
  } catch {
    // Fallback lookup
  }

  // Fallback: check in-memory
  const entry = otpMemoryFallback.get(phone);
  if (entry && entry.expiresAt > Date.now()) {
    return entry.record;
  }

  return null;
};

export const deleteOtp = async (phone: string): Promise<void> => {
  try {
    await redis.del(`otp:${phone}`);
  } catch {
    // ignore
  }
  otpMemoryFallback.delete(phone);
};
