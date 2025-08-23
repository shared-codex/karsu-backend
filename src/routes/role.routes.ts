import { Router } from "express";
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/role.controller";

const router = Router();

/**
 * @openapi
 * /api/roles:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Get all roles with their permissions
 *     responses:
 *       200:
 *         description: List of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *             examples:
 *               Roles:
 *                 $ref: '#/components/examples/Roles'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *   post:
 *     tags:
 *       - Roles
 *     summary: Create a role with permissions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *           examples:
 *             Role:
 *               $ref: '#/components/examples/Role'
 *     responses:
 *       201:
 *         description: Role created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *             examples:
 *               Role:
 *                 $ref: '#/components/examples/Role'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.get("/", getRoles);
router.post("/", createRole);

/**
 * @openapi
 * /api/roles/{id}:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Get role by ID with permissions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *             examples:
 *               Role:
 *                 $ref: '#/components/examples/Role'
 *       404:
 *         description: Role not found
 *         content:
 *           application/json:
 *             example:
 *               message: Role not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *   put:
 *     tags:
 *       - Roles
 *     summary: Update a role and its permissions
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
 *             $ref: '#/components/schemas/Role'
 *           examples:
 *             Role:
 *               $ref: '#/components/examples/Role'
 *     responses:
 *       204:
 *         description: Role updated
 *       404:
 *         description: Role not found
 *         content:
 *           application/json:
 *             example:
 *               message: Role not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *   delete:
 *     tags:
 *       - Roles
 *     summary: Delete a role
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Role deleted
 *       404:
 *         description: Role not found
 *         content:
 *           application/json:
 *             example:
 *               message: Role not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.get("/:id", getRoleById);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

export default router;
