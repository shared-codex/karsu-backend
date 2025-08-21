import { Router } from "express";
import { getShifts, getShiftById, createShift, updateShift, deleteShift } from "../controllers/shift.controller";

const router = Router();

/**
 * @openapi
 * /api/shifts:
 *   get:
 *     tags:
 *       - Shift Attendance
 *     summary: Get all shift attendance records
 *     responses:
 *       200:
 *         description: List of shift attendance records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShiftAttendance'
 *       404:
 *         description: Shift attendance not found
 *       500:
 *         description: Internal server error
 *   post:
 *     tags:
 *       - Shift Attendance
 *     summary: Create a shift attendance record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               worker_id:
 *                 type: integer
 *               shift_date:
 *                 type: string
 *                 format: date
 *               clock_in_time:
 *                 type: string
 *                 format: time
 *               clock_out_time:
 *                 type: string
 *                 format: time
 *                 nullable: true
 *             required:
 *               - worker_id
 *               - shift_date
 *               - clock_in_time
 *           example:
 *             worker_id: 1
 *             shift_date: "2023-01-01"
 *             clock_in_time: "08:00:00"
 *             clock_out_time: "17:00:00"
 *     responses:
 *       201:
 *         description: Shift attendance created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShiftAttendance'
 *       404:
 *         description: Shift attendance not found
 *       500:
 *         description: Internal server error
 */
router.get("/", getShifts);
router.post("/", createShift);

/**
 * @openapi
 * /api/shifts/{id}:
 *   get:
 *     tags:
 *       - Shift Attendance
 *     summary: Get shift attendance by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Shift attendance retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShiftAttendance'
 *       404:
 *         description: Shift attendance not found
 *       500:
 *         description: Internal server error
 *   put:
 *     tags:
 *       - Shift Attendance
 *     summary: Update a shift attendance record
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
 *             type: object
 *             properties:
 *               worker_id:
 *                 type: integer
 *               shift_date:
 *                 type: string
 *                 format: date
 *               clock_in_time:
 *                 type: string
 *                 format: time
 *               clock_out_time:
 *                 type: string
 *                 format: time
 *                 nullable: true
 *             required:
 *               - worker_id
 *               - shift_date
 *               - clock_in_time
 *           example:
 *             worker_id: 1
 *             shift_date: "2023-01-01"
 *             clock_in_time: "08:00:00"
 *             clock_out_time: "17:00:00"
 *     responses:
 *       200:
 *         description: Shift attendance updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShiftAttendance'
 *       404:
 *         description: Shift attendance not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     tags:
 *       - Shift Attendance
 *     summary: Delete a shift attendance record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Shift attendance deleted
 *       404:
 *         description: Shift attendance not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getShiftById);
router.put("/:id", updateShift);
router.delete("/:id", deleteShift);

export default router;
