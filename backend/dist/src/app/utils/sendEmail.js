import { env } from "../config/env";
import { transporter } from "../config/nodemailer";
export const sendEmail = async (options) => {
    if (!transporter) {
        console.error("[Email] FAIL: transporter is null — EMAIL_USER or EMAIL_PASS not set in env");
        throw new Error("Email transporter not configured. Set EMAIL_USER and EMAIL_PASS in environment.");
    }
    try {
        const info = await transporter.sendMail({
            from: `"Gobaadi" <${env.EMAIL_USER}>`,
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
