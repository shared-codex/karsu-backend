import { AppDataSource } from "../database";
import { RefreshToken } from "../entities/RefreshToken";
import { User } from "../entities/User";
import { config } from "../config";
import { hashToken, ttlToMs } from "../utils/token";

const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
const userRepository = AppDataSource.getRepository(User);

/**
 * Create a refresh token record with a hashed token.
 */
export async function createRefreshToken(
  user: User,
  token: string,
  jti: string
): Promise<RefreshToken> {
  const refreshToken = refreshTokenRepository.create({
    jti,
    hashedToken: hashToken(token),
    user,
    expiresAt: new Date(Date.now() + ttlToMs(config.REFRESH_TOKEN_TTL)),
  });

  return refreshTokenRepository.save(refreshToken);
}

/**
 * Find a refresh token by its JWT ID (jti).
 */
export async function findTokenByJti(jti: string): Promise<RefreshToken | null> {
  return refreshTokenRepository.findOne({ where: { jti } });
}

/**
 * Revoke a single refresh token.
 */
export async function revokeToken(
  tokenId: string,
  replacedBy?: string
): Promise<void> {
  await refreshTokenRepository.update({ id: tokenId }, {
    revoked: true,
    replacedBy: replacedBy ?? null,
  });
}

/**
 * Revoke all refresh tokens belonging to a user. Useful on logout or token reuse.
 */
export async function revokeUserTokens(userId: number): Promise<void> {
  await refreshTokenRepository
    .createQueryBuilder()
    .update()
    .set({ revoked: true })
    .where("user_id = :userId", { userId })
    .execute();
}

/**
 * Increment a user's token version, invalidating existing tokens.
 */
export async function bumpTokenVersion(userId: number): Promise<void> {
  await userRepository.increment({ user_id: userId }, "token_version", 1);
}

