import { Request, Response, NextFunction } from "express";

// Define the interface for the error object
interface CustomError extends Error {
  statusCode?: number;
}

// Error handling middleware
const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Default status code is 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;

  // Send the error response
  res.status(statusCode).json({
    success: false,
    message: err.message || "An unexpected error occurred.",
    // Optionally send stack trace in development mode
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorMiddleware;
