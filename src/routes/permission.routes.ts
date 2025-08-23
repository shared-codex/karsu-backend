import { Router } from "express";
import {
  getPermissions,
  getPermissionById,
  createPermission,
  updatePermission,
  deletePermission,
} from "../controllers/permission.controller";

const router = Router();

/**
 * @openapi
 * /api/permissions:
 *   get:
 *     tags:
 *       - Permissions
 *     summary: Get all permissions
 *     responses:
 *       200:
 *         description: List of permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permission'
 *             examples:
 *               Permissions:
 *                 $ref: '../swagger/examples/Permissions.json'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *   post:
 *     tags:
 *       - Permissions
 *     summary: Create a permission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Permission'
 *           examples:
 *             Permission:
 *               $ref: '../swagger/examples/Permission.json'
 *     responses:
 *       201:
 *         description: Permission created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *             examples:
 *               Permission:
 *                 $ref: '../swagger/examples/Permission.json'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.get("/", getPermissions);
router.post("/", createPermission);

/**
 * @openapi
 * /api/permissions/{id}:
 *   get:
 *     tags:
 *       - Permissions
 *     summary: Get permission by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Permission retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *             examples:
 *               Permission:
 *                 $ref: '../swagger/examples/Permission.json'
 *       404:
 *         description: Permission not found
 *         content:
 *           application/json:
 *             example:
 *               message: Permission not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *   put:
 *     tags:
 *       - Permissions
 *     summary: Update a permission
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Permission'
 *           examples:
 *             Permission:
 *               $ref: '../swagger/examples/Permission.json'
 *     responses:
 *       204:
 *         description: Permission updated
 *       404:
 *         description: Permission not found
 *         content:
 *           application/json:
 *             example:
 *               message: Permission not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *   delete:
 *     tags:
 *       - Permissions
 *     summary: Delete a permission
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Permission deleted
 *       404:
 *         description: Permission not found
 *         content:
 *           application/json:
 *             example:
 *               message: Permission not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.get("/:id", getPermissionById);
router.put("/:id", updatePermission);
router.delete("/:id", deletePermission);

export default router;

