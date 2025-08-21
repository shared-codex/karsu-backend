import { Router } from "express";
import {
  getHealthConditions,
  getHealthConditionById,
  createHealthCondition,
  updateHealthCondition,
  deleteHealthCondition,
} from "../controllers/healthCondition.controller";

const router = Router();

/**
 * @openapi
 * /api/health-conditions:
 *   get:
 *     tags:
 *       - Health Conditions
 *     summary: Get all health conditions
 *     responses:
 *       200:
 *         description: List of health conditions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorkerHealthCondition'
 *       404:
 *         description: Health conditions not found
 *       500:
 *         description: Internal server error
 *   post:
 *     tags:
 *       - Health Conditions
 *     summary: Create a health condition
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkerHealthCondition'
 *     responses:
 *       201:
 *         description: Health condition created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkerHealthCondition'
 *       500:
 *         description: Internal server error
 */
router.get("/", getHealthConditions);
router.post("/", createHealthCondition);

/**
 * @openapi
 * /api/health-conditions/{id}:
 *   get:
 *     tags:
 *       - Health Conditions
 *     summary: Get a health condition by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Health condition retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkerHealthCondition'
 *       404:
 *         description: Health condition not found
 *       500:
 *         description: Internal server error
 *   put:
 *     tags:
 *       - Health Conditions
 *     summary: Update a health condition
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
 *             $ref: '#/components/schemas/WorkerHealthCondition'
 *     responses:
 *       200:
 *         description: Health condition updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkerHealthCondition'
 *       404:
 *         description: Health condition not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     tags:
 *       - Health Conditions
 *     summary: Delete a health condition
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Health condition deleted
 *       404:
 *         description: Health condition not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getHealthConditionById);
router.put("/:id", updateHealthCondition);
router.delete("/:id", deleteHealthCondition);

export default router;

