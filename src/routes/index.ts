import { Router, Request, Response, NextFunction } from "express";
import palindromeRoutes from './palindrome';
import catKittyRoutes from './cat-kitty';

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Express + TypeScript Server",
  });
});

// Route palindrome
router.use("/palindrome", palindromeRoutes);
router.use("/cat-kitty", catKittyRoutes);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

export default router;
