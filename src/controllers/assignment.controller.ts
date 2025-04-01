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
    const assignment = await assignmentRepository.findOneBy({ assignment_id: Number(req.params.id) });
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
    const assignment = await assignmentRepository.findOneBy({ assignment_id: Number(req.params.id) });
    if (!assignment) return res.status(404).json({ error: "Assignment not found" });
    assignmentRepository.merge(assignment, req.body);
    const result = await assignmentRepository.save(assignment);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update assignment" });
  }
};

export const deleteAssignment = async (req: Request, res: Response) => {
  try {
    const result = await assignmentRepository.delete(Number(req.params.id));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete assignment" });
  }
};
