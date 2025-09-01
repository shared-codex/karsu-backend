import { createHash } from "crypto";
import { Request, Response } from "express";
import { config } from "../config";
import {
  createCsrfSecret,
  setCsrfCookie,
  clearCsrfCookie,
  validateCsrf,
} from "./csrf";

/**
 * Convert a time-to-live string (e.g., "7d", "10m") to milliseconds.
 */
export function ttlToMs(ttl: string): number {
  const match = ttl.match(/^(\d+)([smhd])$/);
  if (!match) {
    throw new Error(`Invalid TTL format: ${ttl}`);
  }
  const value = parseInt(match[1], 10);
  const unit = match[2];
  const multipliers: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };
  return value * multipliers[unit];
}

const REFRESH_COOKIE_NAME = "refreshToken";
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: config.NODE_ENV === "production",
  path: "/auth/refresh",
};

/**
 * Hash a token using SHA-256.
 */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Set the refresh token cookie on the response.
 */
export function setRefreshCookie(res: Response, token: string): void {
  res.cookie(REFRESH_COOKIE_NAME, token, {
    ...REFRESH_COOKIE_OPTIONS,
    maxAge: ttlToMs(config.REFRESH_TOKEN_TTL),
  });
  const secret = createCsrfSecret();
  setCsrfCookie(res, secret);
}

/**
 * Clear the refresh token cookie from the response.
 */
export function clearRefreshCookie(res: Response): void {
  res.clearCookie(REFRESH_COOKIE_NAME, REFRESH_COOKIE_OPTIONS);
  clearCsrfCookie(res);
}

/**
 * Get the refresh token from the request after validating the CSRF token.
 */
export function getRefreshToken(req: Request): string | null {
  if (!validateCsrf(req)) {
    return null;
  }
  const token = req.cookies?.[REFRESH_COOKIE_NAME];
  return typeof token === "string" ? token : null;
}
