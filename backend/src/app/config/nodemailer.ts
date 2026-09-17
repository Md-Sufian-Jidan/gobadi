import nodemailer from "nodemailer";
import { env } from "./env";

export const transporter = env.EMAIL_USER
  ? nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    })
  : null;

