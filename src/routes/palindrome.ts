import { Router } from "express";
import { index } from "../controllers/palindrome.controller";

const router = Router();

router.get("/", index);

export default router;