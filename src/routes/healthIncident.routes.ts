import { Router } from "express";
import { getHealthIncidents, getHealthIncidentById, createHealthIncident, updateHealthIncident, deleteHealthIncident } from "../controllers/healthIncident.controller";

const router = Router();

router.get("/", getHealthIncidents);
router.get("/:id", getHealthIncidentById);
router.post("/", createHealthIncident);
router.put("/:id", updateHealthIncident);
router.delete("/:id", deleteHealthIncident);

export default router;
