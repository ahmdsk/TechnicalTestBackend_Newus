import { Router } from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controllers/product.controller";
import multer from "multer";
import path from "path";

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  // konfigurasi penamaan file yang unik
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ dest: "uploads/", storage: diskStorage });
const router = Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", upload.single("file"), store);
router.put("/:id", upload.single("file"), update);
router.delete("/:id", destroy);

export default router;
