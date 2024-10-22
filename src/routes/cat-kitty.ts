import { Router } from "express";
import { addRules, catKitty } from "../controllers/cat-kitty.controller";

const router = Router();

router.get("/", catKitty);
router.get("/add-rule", addRules);

export default router;