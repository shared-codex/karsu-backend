import { Router } from "express";
import { getSensorReadings, createSensorReading } from "../controllers/sensorReading.controller";

const router = Router();

router.get("/", getSensorReadings);
router.post("/", createSensorReading);

export default router;
