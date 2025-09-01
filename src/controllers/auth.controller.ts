import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { AppDataSource } from "../database";
import { User } from "../entities/User";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import {
  setRefreshCookie,
  clearRefreshCookie,
  getRefreshToken,
  hashToken,
} from "../utils/token";
import {
  createRefreshToken,
  findTokenByJti,
  revokeToken,
  revokeUserTokens,
  bumpTokenVersion,
} from "../services/token.service";

const userRepository = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    const password_hash = await bcrypt.hash(password, 12);
    const user = userRepository.create({ email, password_hash });
    const saved = await userRepository.save(user);
    return res
      .status(201)
      .json({ id: saved.user_id, email: saved.email });
  } catch (err) {
    return res.status(400).json({ error: "Unable to register" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };

  const user = await userRepository.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const jti = randomUUID();
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user, jti);
  await createRefreshToken(user, refreshToken, jti);
  setRefreshCookie(res, refreshToken);

  return res.json({
    accessToken,
    user: { id: user.user_id, email: user.email },
  });
};

export const refresh = async (req: Request, res: Response) => {
  const token = getRefreshToken(req);
  if (!token) {
    clearRefreshCookie(res);
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = verifyRefreshToken(token);
    const stored = await findTokenByJti(payload.jti);
    if (
      !stored ||
      stored.expiresAt < new Date() ||
      stored.hashedToken !== hashToken(token)
    ) {
      clearRefreshCookie(res);
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (stored.revoked && stored.replacedBy) {
      await revokeUserTokens(payload.sub);
      await bumpTokenVersion(payload.sub);
      clearRefreshCookie(res);
      return res
        .status(401)
        .json({ error: "Refresh token reuse detected. Please re-authenticate." });
    }

    if (stored.revoked) {
      clearRefreshCookie(res);
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await userRepository.findOne({
      where: { user_id: payload.sub },
    });
    if (!user || user.token_version !== payload.tv) {
      clearRefreshCookie(res);
      return res.status(401).json({ error: "Unauthorized" });
    }

    const newJti = randomUUID();
    const accessToken = signAccessToken(user);
    const newRefreshToken = signRefreshToken(user, newJti);
    const newRecord = await createRefreshToken(
      user,
      newRefreshToken,
      newJti
    );
    await revokeToken(stored.id, newRecord.id);
    setRefreshCookie(res, newRefreshToken);

    return res.json({ accessToken });
  } catch (err) {
    clearRefreshCookie(res);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export const logout = async (req: Request, res: Response) => {
  const user = req.user! as any;
  await revokeUserTokens(user.user_id);
  await bumpTokenVersion(user.user_id);
  clearRefreshCookie(res);
  return res.json({ ok: true });
};

export const me = (req: Request, res: Response) => {
  const user = req.user! as any;
  return res.json({ id: user.user_id, email: user.email });
};

