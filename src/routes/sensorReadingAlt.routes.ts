import { Router } from "express";
import {
  createSensorReadingAlt,
  getSensorReadingAlts,
} from "../controllers/sensorReadingAlt.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

// router.use(requireAuth);

/**
 * @openapi
 * /api/sensor-readings-alt:
 *   get:
 *     tags:
 *       - Sensor Readings Alt
 *     summary: Get alternative sensor readings
 *     description: Retrieve alternative sensor readings in reverse chronological order.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         required: false
 *         description: Page number to retrieve. Defaults to 1.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         required: false
 *         description: Number of items per page. Defaults to 10.
 *     responses:
 *       200:
 *         description: Paginated alternative sensor readings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SensorReadingAlt'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *             examples:
 *               SensorReadingAlts:
 *                 $ref: '#/components/examples/SensorReadingAlts'
 *       400:
 *         description: Invalid pagination parameters
 *         content:
 *           application/json:
 *             example:
 *               error: page and limit must be positive integers
 *       500:
 *         description: Failed to fetch alternative sensor readings
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to fetch alternative sensor readings
 *   post:
 *     tags:
 *       - Sensor Readings Alt
 *     summary: Create an alternative sensor reading
 *     description: Accepts a single moisture value from alternative ingestion pipelines.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SensorReadingAltCreate'
 *           examples:
 *             SensorReadingAltCreate:
 *               $ref: '#/components/examples/SensorReadingAltCreate'
 *     responses:
 *       201:
 *         description: Alternative sensor reading created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SensorReadingAlt'
 *             examples:
 *               SensorReadingAlt:
 *                 $ref: '#/components/examples/SensorReadingAlt'
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             example:
 *               error: value must be a finite number
 *       500:
 *         description: Failed to create alternative sensor reading
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to create alternative sensor reading
 */
router.get("/", getSensorReadingAlts);
router.post("/", createSensorReadingAlt);

export default router;
