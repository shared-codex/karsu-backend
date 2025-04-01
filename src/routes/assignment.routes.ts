import { Router } from "express";
import { getAssignments, getAssignmentById, createAssignment, updateAssignment, deleteAssignment } from "../controllers/assignment.controller";

const router = Router();

router.get("/", getAssignments);
router.get("/:id", getAssignmentById);
router.post("/", createAssignment);
router.put("/:id", updateAssignment);
router.delete("/:id", deleteAssignment);

export default router;
