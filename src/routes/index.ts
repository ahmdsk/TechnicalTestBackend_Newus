import { Router, Request, Response, NextFunction } from "express";
import palindromeRoutes from './palindrome';
import catKittyRoutes from './cat-kitty';
import categoryRoutes from './category';
import productRoutes from './product';

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Express + TypeScript Server",
  });
});

// Route palindrome
router.use("/palindrome", palindromeRoutes);
router.use("/cat-kitty", catKittyRoutes);
router.use("/category", categoryRoutes);
router.use("/product", productRoutes);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

export default router;
