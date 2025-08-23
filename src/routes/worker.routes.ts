import { Router } from "express";
import {
  getWorkers,
  getWorkerById,
  createWorker,
  updateWorker,
  deleteWorker,
} from "../controllers/worker.controller";

const router = Router();

/**
 * @openapi
 * /api/workers:
 *   get:
 *     tags:
 *       - Workers
 *     summary: Get all workers
 *     responses:
 *       200:
 *         description: List of workers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Worker'
 *             examples:
 *               Workers:
 *                 $ref: '#/components/examples/Workers'
 *       404:
 *         description: Workers not found
 *         content:
 *           application/json:
 *             example:
 *               message: Workers not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *   post:
 *     tags:
 *       - Workers
 *     summary: Create a worker
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Worker'
 *           examples:
 *             Worker:
 *               $ref: '#/components/examples/Worker'
 *     responses:
 *       201:
 *         description: Worker created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Worker'
 *             examples:
 *               Worker:
 *                 $ref: '#/components/examples/Worker'
 *       404:
 *         description: Worker not found
 *         content:
 *           application/json:
 *             example:
 *               message: Worker not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.get("/", getWorkers);
router.post("/", createWorker);

/**
 * @openapi
 * /api/workers/{id}:
 *   get:
 *     tags:
 *       - Workers
 *     summary: Get worker by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Worker retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Worker'
 *             examples:
 *               Worker:
 *                 $ref: '#/components/examples/Worker'
 *       404:
 *         description: Worker not found
 *         content:
 *           application/json:
 *             example:
 *               message: Worker not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *   put:
 *     tags:
 *       - Workers
 *     summary: Update a worker
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
 *             $ref: '#/components/schemas/Worker'
 *           examples:
 *             Worker:
 *               $ref: '#/components/examples/Worker'
 *     responses:
 *       204:
 *         description: Worker updated
 *       404:
 *         description: Worker not found
 *         content:
 *           application/json:
 *             example:
 *               message: Worker not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *   delete:
 *     tags:
 *       - Workers
 *     summary: Delete a worker
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Worker deleted
 *       404:
 *         description: Worker not found
 *         content:
 *           application/json:
 *             example:
 *               message: Worker not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.get("/:id", getWorkerById);
router.put("/:id", updateWorker);
router.delete("/:id", deleteWorker);

export default router;
