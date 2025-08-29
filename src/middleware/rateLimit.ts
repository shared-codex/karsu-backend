import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

export const refreshLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many token requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

