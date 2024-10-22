import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import createError from "http-errors";
import router from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json())

// Call Router
app.use("/", router);

// handle 404 error
app.use((req: Request, res: Response, next: Function) => {
  next(createError(404));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
