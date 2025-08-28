import { randomBytes } from "crypto";
import { Request, Response } from "express";
import { config } from "../config";

export const CSRF_COOKIE_NAME = "csrfToken";
export const CSRF_COOKIE_OPTIONS = {
  httpOnly: false,
  sameSite: "strict" as const,
  secure: config.NODE_ENV === "production",
  path: "/",
};

/**
 * Generate a random CSRF secret.
 */
export function createCsrfSecret(): string {
  return randomBytes(32).toString("hex");
}

/**
 * Set the CSRF cookie on the response.
 */
export function setCsrfCookie(res: Response, secret: string): void {
  res.cookie(CSRF_COOKIE_NAME, secret, CSRF_COOKIE_OPTIONS);
}

/**
 * Clear the CSRF cookie from the response.
 */
export function clearCsrfCookie(res: Response): void {
  res.clearCookie(CSRF_COOKIE_NAME, CSRF_COOKIE_OPTIONS);
}

/**
 * Validate the CSRF token from the request header and cookie.
 */
export function validateCsrf(req: Request): boolean {
  const headerToken = req.headers["x-csrf"];
  if (typeof headerToken !== "string") {
    return false;
  }
  const cookieToken = req.cookies?.[CSRF_COOKIE_NAME];
  if (typeof cookieToken !== "string") {
    return false;
  }
  return headerToken === cookieToken;
}
