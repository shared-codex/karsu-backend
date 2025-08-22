import { Router } from "express";
import { getSensorReadings, createSensorReading } from "../controllers/sensorReading.controller";

const router = Router();

/**
 * @openapi
 * /api/sensor-readings:
 *   get:
 *     tags:
 *       - Sensor Readings
 *     summary: Get sensor readings
 *     description: Retrieve sensor readings. Optionally filter by device ID and time range.
 *     parameters:
 *       - in: query
 *         name: deviceId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter readings by device ID
 *       - in: query
 *         name: fromTimestamp
 *         schema:
 *           type: string
 *           format: date-time
 *         required: false
 *         description: Start of ISO 8601 timestamp range
 *       - in: query
 *         name: toTimestamp
 *         schema:
 *           type: string
 *           format: date-time
 *         required: false
 *         description: End of ISO 8601 timestamp range
 *     responses:
 *       200:
 *         description: List of sensor readings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SensorReading'
 *             examples:
 *               SensorReadings:
 *                 $ref: '../swagger/examples/SensorReadings.json'
 *       500:
 *         description: Failed to fetch sensor readings
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to fetch sensor readings
 *   post:
 *     tags:
 *       - Sensor Readings
 *     summary: Create a sensor reading
 *     description: |
 *       Timestamp must be an ISO 8601 string.
 *       Numeric fields heart_rate, step_count, stationary_time, and battery_level are integers.
 *       gas_level is a decimal number.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SensorReading'
 *           examples:
 *             SensorReading:
 *               $ref: '../swagger/examples/SensorReading.json'
 *     responses:
 *       201:
 *         description: Sensor reading created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SensorReading'
 *             examples:
 *               SensorReading:
 *                 $ref: '../swagger/examples/SensorReading.json'
 *       500:
 *         description: Failed to create sensor reading
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to create sensor reading
 */
router.get("/", getSensorReadings);
router.post("/", createSensorReading);

export default router;
