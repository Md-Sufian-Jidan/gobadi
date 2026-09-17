import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import status from 'http-status';
import cookieParser from 'cookie-parser';
import { env } from './app/config/env';
import { sendResponse } from './app/utils/sendResponse';
import { notFound } from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import { swaggerSpec } from './app/swagger';

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

app.get('/api-docs/swagger.json', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('/api-docs', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Gobadi Dashboard API Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  <style>
    html { box-sizing: border-box; overflow-y: scroll; }
    *, *:before, *:after { box-sizing: inherit; }
    body { margin: 0; background: #fafafa; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js" charset="UTF-8"></script>
  <script>
    SwaggerUIBundle({
      url: '/api-docs/swagger.json',
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIBundle.SwaggerUIStandalonePreset
      ],
      layout: "BaseLayout",
      deepLinking: true,
      filter: true
    });
  </script>
</body>
</html>`);
});

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