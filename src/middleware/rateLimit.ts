import rateLimit, { Options } from "express-rate-limit";
import { Request, Response, NextFunction } from "express";

const handler = (
  _req: Request,
  res: Response,
  _next: NextFunction,
  options: Options
) => {
  const message =
    typeof options.message === "string" ? options.message : "Too many requests";
  res.status(429).json({ error: message });
};

export const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});

export const refreshLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many token requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});

