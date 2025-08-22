import { Router } from "express";
import {
  getHealthIncidents,
  getHealthIncidentById,
  createHealthIncident,
  updateHealthIncident,
  deleteHealthIncident,
} from "../controllers/healthIncident.controller";

const router = Router();

/**
 * @openapi
 * /api/health-incidents:
 *   get:
 *     tags:
 *       - Health Incidents
 *     summary: Get all health incidents
 *     responses:
 *       200:
 *         description: List of health incidents (resolution_date and duration may be null)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorkerHealthIncident'
 *             examples:
 *               HealthIncidents:
 *                 $ref: '../swagger/examples/HealthIncidents.json'
 *       404:
 *         description: Health incidents not found
 *         content:
 *           application/json:
 *             example:
 *               message: Health incidents not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *   post:
 *     tags:
 *       - Health Incidents
 *     summary: Create a health incident
 *     requestBody:
 *       required: true
 *       description: Fields resolution_date and duration are nullable
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkerHealthIncident'
 *           examples:
 *             HealthIncident:
 *               $ref: '../swagger/examples/HealthIncident.json'
 *     responses:
 *       201:
 *         description: Health incident created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkerHealthIncident'
 *             examples:
 *               HealthIncident:
 *                 $ref: '../swagger/examples/HealthIncident.json'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.get("/", getHealthIncidents);
router.post("/", createHealthIncident);

/**
 * @openapi
 * /api/health-incidents/{id}:
 *   get:
 *     tags:
 *       - Health Incidents
 *     summary: Get a health incident by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Health incident retrieved (resolution_date and duration may be null)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkerHealthIncident'
 *             examples:
 *               HealthIncident:
 *                 $ref: '../swagger/examples/HealthIncident.json'
 *       404:
 *         description: Health incident not found
 *         content:
 *           application/json:
 *             example:
 *               message: Health incident not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *   put:
 *     tags:
 *       - Health Incidents
 *     summary: Update a health incident
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       description: Fields resolution_date and duration are nullable
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkerHealthIncident'
 *           examples:
 *             HealthIncident:
 *               $ref: '../swagger/examples/HealthIncident.json'
 *     responses:
 *       200:
 *         description: Health incident updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkerHealthIncident'
 *             examples:
 *               HealthIncident:
 *                 $ref: '../swagger/examples/HealthIncident.json'
 *       404:
 *         description: Health incident not found
 *         content:
 *           application/json:
 *             example:
 *               message: Health incident not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *   delete:
 *     tags:
 *       - Health Incidents
 *     summary: Delete a health incident
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Health incident deleted
 *       404:
 *         description: Health incident not found
 *         content:
 *           application/json:
 *             example:
 *               message: Health incident not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.get("/:id", getHealthIncidentById);
router.put("/:id", updateHealthIncident);
router.delete("/:id", deleteHealthIncident);

export default router;

