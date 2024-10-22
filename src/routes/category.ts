import { Router } from "express";
import { destroy, index, show, store, update } from "../controllers/category.controller";

const router = Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", store);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;