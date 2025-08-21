import { Router } from "express";
import { getDevices, getDeviceById, createDevice, updateDevice, deleteDevice } from "../controllers/device.controller";

const router = Router();

/**
 * @openapi
 * /api/devices:
 *   get:
 *     tags:
 *       - Devices
 *     summary: Get all devices
 *     responses:
 *       200:
 *         description: List of devices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Device'
 *             examples:
 *               Devices:
 *                 value:
 *                   - device_id: "dev-1"
 *                     model: "Model A"
 *                     status: Active
 *                   - device_id: "dev-2"
 *                     model: "Model B"
 *                     status: Available
 *                   - device_id: "dev-3"
 *                     model: "Model C"
 *                     status: Lost
 *                   - device_id: "dev-4"
 *                     model: "Model D"
 *                     status: Retired
 *       404:
 *         description: Devices not found
 *       500:
 *         description: Internal server error
 *   post:
 *     tags:
 *       - Devices
 *     summary: Create a device
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device_id:
 *                 type: string
 *               model:
 *                 type: string
 *                 nullable: true
 *               status:
 *                 type: string
 *                 enum: [Active, Available, Lost, Retired]
 *             required:
 *               - device_id
 *               - status
 *           example:
 *             device_id: "dev-5"
 *             model: "Model E"
 *             status: Available
 *     responses:
 *       201:
 *         description: Device created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *             example:
 *               device_id: "dev-5"
 *               model: "Model E"
 *               status: Available
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.get("/", getDevices);
router.post("/", createDevice);

/**
 * @openapi
 * /api/devices/{id}:
 *   get:
 *     tags:
 *       - Devices
 *     summary: Get device by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Device retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *             example:
 *               device_id: "dev-1"
 *               model: "Model A"
 *               status: Active
 *       404:
 *         description: Device not found
 *       500:
 *         description: Internal server error
 *   put:
 *     tags:
 *       - Devices
 *     summary: Update a device
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device_id:
 *                 type: string
 *               model:
 *                 type: string
 *                 nullable: true
 *               status:
 *                 type: string
 *                 enum: [Active, Available, Lost, Retired]
 *             required:
 *               - device_id
 *               - status
 *           example:
 *             device_id: "dev-1"
 *             model: "Model Z"
 *             status: Lost
 *     responses:
 *       200:
 *         description: Device updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *             example:
 *               device_id: "dev-1"
 *               model: "Model Z"
 *               status: Lost
 *       404:
 *         description: Device not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     tags:
 *       - Devices
 *     summary: Delete a device
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Device deleted
 *       404:
 *         description: Device not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getDeviceById);
router.put("/:id", updateDevice);
router.delete("/:id", deleteDevice);

export default router;
