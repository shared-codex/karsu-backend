import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../database";
import { User } from "../entities/User";
import { verifyAccessToken } from "../utils/jwt";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.slice(7).trim();

  try {
    const payload = verifyAccessToken(token);
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { user_id: payload.sub },
      relations: ["role", "role.permissions"],
    });

    if (!user || user.token_version !== payload.tv) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user as any;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

