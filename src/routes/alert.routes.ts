import { Router } from "express";
import {
  getAlerts,
  getAlertById,
  createAlert,
  updateAlert,
  deleteAlert,
} from "../controllers/alert.controller";

const router = Router();

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
 *                 $ref: '../swagger/examples/Alerts.json'
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
 *               $ref: '../swagger/examples/Alert.json'
 *     responses:
 *       201:
 *         description: Alert created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alert'
 *             examples:
 *               Alert:
 *                 $ref: '../swagger/examples/Alert.json'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.get("/", getAlerts);
router.post("/", createAlert);

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
 *                 $ref: '../swagger/examples/Alert.json'
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
 *               $ref: '../swagger/examples/Alert.json'
 *     responses:
 *       200:
 *         description: Alert updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alert'
 *             examples:
 *               Alert:
 *                 $ref: '../swagger/examples/Alert.json'
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
router.put("/:id", updateAlert);
router.delete("/:id", deleteAlert);

export default router;
