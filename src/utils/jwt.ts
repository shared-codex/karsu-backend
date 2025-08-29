import jwt from "jsonwebtoken";
import { config } from "../config";
import { AccessTokenPayload, RefreshTokenPayload } from "../types/token";
import { User } from "../entities/User";

/**
 * Sign an access token with a 10 minute expiry.
 */
export function signAccessToken(user: Pick<User, "user_id" | "token_version">): string {
  const payload: AccessTokenPayload = {
    sub: user.user_id,
    tv: user.token_version,
  };

  return jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
}

/**
 * Sign a refresh token with a 7 day expiry.
 */
export function signRefreshToken(
  user: Pick<User, "user_id" | "token_version">,
  jti: string
): string {
  const payload: RefreshTokenPayload = {
    sub: user.user_id,
    tv: user.token_version,
    jti,
  };

  return jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
}

/**
 * Verify an access token and return its payload.
 */
export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, config.ACCESS_TOKEN_SECRET) as unknown as AccessTokenPayload;
}

/**
 * Verify a refresh token and return its payload.
 */
export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, config.REFRESH_TOKEN_SECRET) as unknown as RefreshTokenPayload;
}
