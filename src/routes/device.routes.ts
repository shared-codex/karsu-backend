import { Router } from "express";
import { getDevices, getDeviceById, createDevice, updateDevice, deleteDevice } from "../controllers/device.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.use(requireAuth);

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
 *                 $ref: '#/components/examples/Devices'
 *       404:
 *         description: Devices not found
 *         content:
 *           application/json:
 *             example:
 *               message: Devices not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
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
 *           examples:
 *             Device:
 *               $ref: '#/components/examples/Device'
 *     responses:
 *       201:
 *         description: Device created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *             examples:
 *               Device:
 *                 $ref: '#/components/examples/Device'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
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
 *             examples:
 *               Device:
 *                 $ref: '#/components/examples/Device'
 *       404:
 *         description: Device not found
 *         content:
 *           application/json:
 *             example:
 *               message: Device not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
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
 *           examples:
 *             Device:
 *               $ref: '#/components/examples/Device'
 *     responses:
 *       204:
 *         description: Device updated
 *       404:
 *         description: Device not found
 *         content:
 *           application/json:
 *             example:
 *               message: Device not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
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
 *         content:
 *           application/json:
 *             example:
 *               message: Device not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.get("/:id", getDeviceById);
router.put("/:id", updateDevice);
router.delete("/:id", deleteDevice);

export default router;
