import { Router } from "express";
import { getWorkers, getWorkerById, createWorker, updateWorker, deleteWorker } from "../controllers/worker.controller";

const router = Router();

router.get("/", getWorkers);
router.get("/:id", getWorkerById);
router.post("/", createWorker);
router.put("/:id", updateWorker);
router.delete("/:id", deleteWorker);

export default router;
