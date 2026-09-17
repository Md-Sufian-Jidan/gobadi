import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import status from 'http-status';
import cookieParser from 'cookie-parser';
import { env } from './app/config/env';
import { sendResponse } from './app/utils/sendResponse';
import { notFound } from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';

const app: Application = express();

app.use(express.json({ limit: "16kb", }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cors({
  origin: [env.FRONTEND_URL, "http://localhost:3000", "http://localhost:7000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
}));
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Gobadi server is running successfully",
    data: {
      author: {
        name: "Gobadi",
        version: "1.0.0",
      },
      host: req.hostname,
      time: new Date().toISOString(),
    }
  });
});

app.use('/api/v1', router);
app.use(globalErrorHandler);
app.use(notFound);

export default app; 