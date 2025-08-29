import { Router, Request, Response, NextFunction } from "express";
import { loginLimiter, refreshLimiter } from "../middleware/rateLimit";
import { requireAuth } from "../middleware/requireAuth";
import {
  register,
  login,
  refresh,
  logout,
  me,
} from "../controllers/auth.controller";
import { validateCsrf } from "../utils/csrf";

const router = Router();

const csrfValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!validateCsrf(req)) {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }
  next();
};

router.post("/register", register);
router.post("/login", loginLimiter, login);
router.post("/refresh", refreshLimiter, csrfValidation, refresh);
router.post("/logout", requireAuth, logout);
router.get("/me", requireAuth, me);

export default router;
