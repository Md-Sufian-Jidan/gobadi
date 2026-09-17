import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

import status from 'http-status';
import AppError from '../errors/AppError';

interface EnvConfig {
  PORT: string;
  DATABASE_URL: string;
  NODE_ENV: string;
  ADMIN_PASSWORD: string;
  ADMIN_EMAIL: string;
  FRONTEND_URL: string;
  EMAIL_USER: string;
  EMAIL_PASS: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_EXPIRES_IN: string;
  JWT_REFRESH_EXPIRES_IN: string;
  UPSTASH_REDIS_REST_URL: string;
  UPSTASH_REDIS_REST_TOKEN: string;
  GOOGLE_CLIENT_ID: string;
  FACEBOOK_APP_ID: string;
  FACEBOOK_APP_SECRET: string;
}

const loadEnvVar = (): EnvConfig => {
  const requiredVars = [
    'PORT',
    'DATABASE_URL',
    'NODE_ENV',
    'ADMIN_PASSWORD',
    'ADMIN_EMAIL',
    'FRONTEND_URL',
    'EMAIL_USER',
    'EMAIL_PASS',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET',
    'JWT_EXPIRES_IN',
    'JWT_REFRESH_EXPIRES_IN',
    'UPSTASH_REDIS_REST_URL',
    'UPSTASH_REDIS_REST_TOKEN',
    'GOOGLE_CLIENT_ID',
    'FACEBOOK_APP_ID',
    'FACEBOOK_APP_SECRET',
  ];

  const missingVars: string[] = [];
  requiredVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  });

  if (missingVars.length > 0) {
    console.error('❌ Missing critical environment variables:', missingVars.join(', '));
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      `Deployment failed: Missing environment variable(s): ${missingVars.join(
        ', '
      )}. Please add them to your Vercel Project Settings.`
    );
  }

  return {
    PORT: process.env.PORT || '7000',
    DATABASE_URL: process.env.DATABASE_URL!,
    NODE_ENV: process.env.NODE_ENV!,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || '',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || '',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
    EMAIL_USER: process.env.EMAIL_USER || '',
    EMAIL_PASS: process.env.EMAIL_PASS || '',
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || '',
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN!,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN!,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL!,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN!,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || '',
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || '',
  };
};

export const env = loadEnvVar();
