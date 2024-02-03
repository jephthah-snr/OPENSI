import "reflect-metadata";
import { NextFunction, Request, Response } from "express";
import express from "express";
import { createServer } from "http";
import { config as env } from "dotenv";
import bodyParser from 'body-parser';
import AppError from "./shared/utils/AppError";
import router from "../src/module/main/main.route";

env();
const app = express();
const Server = createServer(app);
const appDefaultPort = 8000
app.use(bodyParser.json());

// Move the errorHandler registration after defining routes
app.use('/api/v1', router);

app.get("/", async (_, res: Response) => {
  res.redirect("/api/v1");
});

app.get('/api/v1', async (_, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Backend Api Running",
  });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, `Invalid Route ${req.originalUrl}`));
});

// Register the errorHandler after defining routes
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
});

Server.listen(process.env.PORT ?? appDefaultPort, () => {
  console.log(`Server running on PORT http://0.0.0.0:${process.env.PORT ?? appDefaultPort}`);
});
