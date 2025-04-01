import { Router } from "express";
import { getHealthConditions, getHealthConditionById, createHealthCondition, updateHealthCondition, deleteHealthCondition } from "../controllers/healthCondition.controller";

const router = Router();

router.get("/", getHealthConditions);
router.get("/:id", getHealthConditionById);
router.post("/", createHealthCondition);
router.put("/:id", updateHealthCondition);
router.delete("/:id", deleteHealthCondition);

export default router;
