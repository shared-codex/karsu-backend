import { Router } from "express";
import { getAssignments, getAssignmentById, createAssignment, updateAssignment, deleteAssignment } from "../controllers/assignment.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.use(requireAuth);

/**
 * @openapi
 * /api/assignments:
 *   get:
 *     tags:
 *       - Assignments
 *     summary: Get all assignments
 *     responses:
 *       200:
 *         description: List of assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorkerDeviceAssignment'
 *             examples:
 *               Assignments:
 *                 $ref: '#/components/examples/Assignments'
 *       404:
 *         description: Assignments not found
 *         content:
 *           application/json:
 *             example:
 *               message: Assignments not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *   post:
 *     tags:
 *       - Assignments
 *     summary: Create an assignment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               worker_id:
 *                 type: integer
 *               device_id:
 *                 type: string
 *               assigned_date:
 *                 type: string
 *                 format: date
 *               unassigned_date:
 *                 type: string
 *                 format: date
 *                 nullable: true
 *             required:
 *               - worker_id
 *               - device_id
 *               - assigned_date
 *           examples:
 *             Assignment:
 *               $ref: '#/components/examples/Assignment'
 *     responses:
 *       201:
 *         description: Assignment created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkerDeviceAssignment'
 *             examples:
 *               Assignment:
 *                 $ref: '#/components/examples/Assignment'
 *       404:
 *         description: Assignment not found
 *         content:
 *           application/json:
 *             example:
 *               message: Assignment not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.get("/", getAssignments);
router.post("/", createAssignment);
/**
 * @openapi
 * /api/assignments/{id}:
 *   get:
 *     tags:
 *       - Assignments
 *     summary: Get assignment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Assignment retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkerDeviceAssignment'
 *             examples:
 *               Assignment:
 *                 $ref: '#/components/examples/Assignment'
 *       404:
 *         description: Assignment not found
 *         content:
 *           application/json:
 *             example:
 *               message: Assignment not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *   put:
 *     tags:
 *       - Assignments
 *     summary: Update an assignment
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
 *               device_id:
 *                 type: string
 *               assigned_date:
 *                 type: string
 *                 format: date
 *               unassigned_date:
 *                 type: string
 *                 format: date
 *                 nullable: true
 *             required:
 *               - worker_id
 *               - device_id
 *               - assigned_date
 *           examples:
 *             Assignment:
 *               $ref: '#/components/examples/Assignment'
 *     responses:
 *       204:
 *         description: Assignment updated
 *       404:
 *         description: Assignment not found
 *         content:
 *           application/json:
 *             example:
 *               message: Assignment not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *   delete:
 *     tags:
 *       - Assignments
 *     summary: Delete an assignment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Assignment deleted
 *       404:
 *         description: Assignment not found
 *         content:
 *           application/json:
 *             example:
 *               message: Assignment not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.get("/:id", getAssignmentById);
router.put("/:id", updateAssignment);
router.delete("/:id", deleteAssignment);

export default router;
