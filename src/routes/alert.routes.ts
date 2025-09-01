import { Router } from "express";
import {
  getAlerts,
  getAlertById,
  createAlert,
  updateAlert,
  deleteAlert,
} from "../controllers/alert.controller";
import { AlertType } from "../entities/Alert";
import { validateEnum } from "../middleware/enumValidation.middleware";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.use(requireAuth);

/**
 * @openapi
 * /api/alerts:
 *   get:
 *     tags:
 *       - Alerts
 *     summary: Get all alerts
 *     responses:
 *       200:
 *         description: List of alerts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Alert'
 *             examples:
 *               Alerts:
 *                 $ref: '#/components/examples/Alerts'
 *       404:
 *         description: Alerts not found
 *         content:
 *           application/json:
 *             example:
 *               message: Alerts not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *   post:
 *     tags:
 *       - Alerts
 *     summary: Create an alert
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Alert'
 *           examples:
 *             Alert:
 *               $ref: '#/components/examples/Alert'
 *     responses:
 *       201:
 *         description: Alert created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alert'
 *             examples:
 *               Alert:
 *                 $ref: '#/components/examples/Alert'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.get("/", getAlerts);
router.post(
  "/",
  validateEnum("alert_type", Object.values(AlertType)),
  createAlert
);

/**
 * @openapi
 * /api/alerts/{id}:
 *   get:
 *     tags:
 *       - Alerts
 *     summary: Get alert by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alert retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alert'
 *             examples:
 *               Alert:
 *                 $ref: '#/components/examples/Alert'
 *       404:
 *         description: Alert not found
 *         content:
 *           application/json:
 *             example:
 *               message: Alert not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *   put:
 *     tags:
 *       - Alerts
 *     summary: Update an alert
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
 *             $ref: '#/components/schemas/Alert'
 *           examples:
 *             Alert:
 *               $ref: '#/components/examples/Alert'
 *     responses:
 *       204:
 *         description: Alert updated
 *       404:
 *         description: Alert not found
 *         content:
 *           application/json:
 *             example:
 *               message: Alert not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *   delete:
 *     tags:
 *       - Alerts
 *     summary: Delete an alert
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Alert deleted
 *       404:
 *         description: Alert not found
 *         content:
 *           application/json:
 *             example:
 *               message: Alert not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.get("/:id", getAlertById);
router.put(
  "/:id",
  validateEnum("alert_type", Object.values(AlertType)),
  updateAlert
);
router.delete("/:id", deleteAlert);

export default router;
