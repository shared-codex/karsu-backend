import { Router } from "express";
import { loginLimiter, refreshLimiter } from "../middleware/rateLimit";
import { requireAuth } from "../middleware/requireAuth";
import {
  register,
  login,
  refresh,
  logout,
  me,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", loginLimiter, login);
router.post("/refresh", refreshLimiter, refresh);
router.post("/logout", requireAuth, logout);
router.get("/me", requireAuth, me);

export default router;
