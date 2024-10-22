import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import createError from "http-errors";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json())

// handle 404 error
app.use((req: Request, res: Response, next: Function) => {
  next(createError(404));
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
