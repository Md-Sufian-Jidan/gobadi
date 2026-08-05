import dotenv from 'dotenv';
import status from 'http-status';
import AppError from '../errors/AppError';
dotenv.config();
const loadEnvVar = () => {
    const requiredVars = [
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
    ];
    const missingVars = [];
    requiredVars.forEach((envVar) => {
        if (!process.env[envVar]) {
            missingVars.push(envVar);
        }
    });
    if (missingVars.length > 0) {
        console.error('❌ Missing critical environment variables:', missingVars.join(', '));
        throw new AppError(status.INTERNAL_SERVER_ERROR, `Deployment failed: Missing environment variable(s): ${missingVars.join(', ')}. Please add them to your Vercel Project Settings.`);
    }
    return {
        port: process.env.PORT || '7000',
        database_url: process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        FRONTEND_URL: process.env.FRONTEND_URL,
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASS: process.env.EMAIL_PASS,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
        JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
    };
};
export const env = loadEnvVar();
