import { Request, Response, NextFunction } from "express";
import { UserNotFoundError } from "./UserNotFoundError";
import { EmailAlreadyInUseError } from "./EmailAlreadyInUseError";

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof UserNotFoundError) {
    return res.status(404).json({ message: error.message });
  }

  if (error instanceof EmailAlreadyInUseError) {
    return res.status(409).json({ message: error.message });
  }

  console.error("[UNEXPECTED ERROR]", error);

  return res.status(500).json({
    message: "Internal server error",
  });
}
