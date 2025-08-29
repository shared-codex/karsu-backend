import { Router } from "express";
import { loginLimiter, refreshLimiter } from "../middleware/rateLimit";

const router = Router();

router.post("/login", loginLimiter, (req, res) => {
  res.status(200).json({ message: "login" });
});

router.post("/refresh", refreshLimiter, (req, res) => {
  res.status(200).json({ message: "refresh" });
});

export default router;

