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

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           examples:
 *             Register:
 *               value:
 *                 email: user@example.com
 *                 password: strongPassword123
 *     responses:
 *       201:
 *         description: User registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *             examples:
 *               User:
 *                 value:
 *                   id: 1
 *                   email: user@example.com
 *       400:
 *         description: Unable to register
 *         content:
 *           application/json:
 *             example:
 *               error: Unable to register
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
router.post("/register", register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           examples:
 *             Login:
 *               value:
 *                 email: user@example.com
 *                 password: strongPassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *             examples:
 *               Success:
 *                 value:
 *                   accessToken: access.token.value
 *                   user:
 *                     id: 1
 *                     email: user@example.com
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid credentials
 *       429:
 *         description: Too many login attempts
 *         content:
 *           application/json:
 *             example:
 *               error: Too many login attempts, please try again later.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
router.post("/login", loginLimiter, login);

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Refresh access token
 *     responses:
 *       200:
 *         description: New access token issued
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *             examples:
 *               Token:
 *                 value:
 *                   accessToken: new.access.token
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized
 *       429:
 *         description: Too many token requests
 *         content:
 *           application/json:
 *             example:
 *               error: Too many token requests, please try again later.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
router.post("/refresh", refreshLimiter, refresh);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Log out the current user
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *             examples:
 *               Success:
 *                 value:
 *                   ok: true
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
router.post("/logout", requireAuth, logout);

/**
 * @openapi
 * /auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get current user
 *     responses:
 *       200:
 *         description: Current user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *             examples:
 *               User:
 *                 value:
 *                   id: 1
 *                   email: user@example.com
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
router.get("/me", requireAuth, me);

export default router;
