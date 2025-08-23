import { Router } from "express";
import {
  getHealthConditions,
  getHealthConditionById,
  createHealthCondition,
  updateHealthCondition,
  deleteHealthCondition,
} from "../controllers/healthCondition.controller";
import { SeverityLevel, ConditionStatus } from "../entities/WorkerHealthCondition";
import { validateEnum } from "../middleware/enumValidation.middleware";

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
 *             examples:
 *               HealthConditions:
 *                 $ref: '#/components/examples/HealthConditions'
 *       404:
 *         description: Health conditions not found
 *         content:
 *           application/json:
 *             example:
 *               message: Health conditions not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
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
 *           examples:
 *             HealthCondition:
 *               $ref: '#/components/examples/HealthCondition'
 *     responses:
 *       201:
 *         description: Health condition created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkerHealthCondition'
 *             examples:
 *               HealthCondition:
 *                 $ref: '#/components/examples/HealthCondition'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.get("/", getHealthConditions);
router.post(
  "/",
  validateEnum("severity", Object.values(SeverityLevel)),
  validateEnum("status", Object.values(ConditionStatus)),
  createHealthCondition
);

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
 *             examples:
 *               HealthCondition:
 *                 $ref: '#/components/examples/HealthCondition'
 *       404:
 *         description: Health condition not found
 *         content:
 *           application/json:
 *             example:
 *               message: Health condition not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
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
 *           examples:
 *             HealthCondition:
 *               $ref: '#/components/examples/HealthCondition'
 *     responses:
 *       204:
 *         description: Health condition updated
 *       404:
 *         description: Health condition not found
 *         content:
 *           application/json:
 *             example:
 *               message: Health condition not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
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
 *         content:
 *           application/json:
 *             example:
 *               message: Health condition not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.get("/:id", getHealthConditionById);
router.put(
  "/:id",
  validateEnum("severity", Object.values(SeverityLevel)),
  validateEnum("status", Object.values(ConditionStatus)),
  updateHealthCondition
);
router.delete("/:id", deleteHealthCondition);

export default router;

