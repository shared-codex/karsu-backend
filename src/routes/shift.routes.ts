import { Router } from "express";
import { getShifts, getShiftById, createShift, updateShift, deleteShift } from "../controllers/shift.controller";

const router = Router();

router.get("/", getShifts);
router.get("/:id", getShiftById);
router.post("/", createShift);
router.put("/:id", updateShift);
router.delete("/:id", deleteShift);

export default router;
