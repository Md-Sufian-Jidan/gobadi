"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const env_1 = require("../config/env");
const nodemailer_1 = require("../config/nodemailer");
const sendEmail = async (options) => {
    if (!nodemailer_1.transporter) {
        console.error("[Email] FAIL: transporter is null — EMAIL_USER or EMAIL_PASS not set in env");
        throw new Error("Email transporter not configured. Set EMAIL_USER and EMAIL_PASS in environment.");
    }
    try {
        const info = await nodemailer_1.transporter.sendMail({
            from: `"Gobaadi" <${env_1.env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
        });
    }
    catch (error) {
        console.error(`[Email] sendMail FAILED — to: ${options.to}, error:`, error instanceof Error ? error.message : error);
        throw error;
    }
};
exports.sendEmail = sendEmail;
