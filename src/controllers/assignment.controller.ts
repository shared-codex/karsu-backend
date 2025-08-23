import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { WorkerDeviceAssignment } from "../entities/WorkerDeviceAssignment";

const assignmentRepository = AppDataSource.getRepository(WorkerDeviceAssignment);

export const getAssignments = async (req: Request, res: Response) => {
  try {
    const assignments = await assignmentRepository.find();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
};

export const getAssignmentById = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!Number.isInteger(+idParam)) return res.status(400).json({ error: "Invalid id" });
    const assignment = await assignmentRepository.findOneBy({ assignment_id: Number(idParam) });
    if (!assignment) return res.status(404).json({ error: "Assignment not found" });
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assignment" });
  }
};

export const createAssignment = async (req: Request, res: Response) => {
  try {
    const newAssignment = assignmentRepository.create(req.body);
    const result = await assignmentRepository.save(newAssignment);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create assignment" });
  }
};

export const updateAssignment = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!Number.isInteger(+idParam)) return res.status(400).json({ error: "Invalid id" });
    const result = await assignmentRepository.update(Number(idParam), req.body);
    if (result.affected === 0) return res.status(404).json({ error: "Assignment not found" });
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to update assignment" });
  }
};

export const deleteAssignment = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!Number.isInteger(+idParam)) return res.status(400).json({ error: "Invalid id" });
    const result = await assignmentRepository.delete(Number(idParam));
    if (result.affected === 0) return res.status(404).json({ error: "Assignment not found" });
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete assignment" });
  }
};
