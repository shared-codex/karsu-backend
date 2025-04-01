import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { WorkerHealthCondition } from "../entities/WorkerHealthCondition";

const healthConditionRepository = AppDataSource.getRepository(WorkerHealthCondition);

export const getHealthConditions = async (req: Request, res: Response) => {
  try {
    const conditions = await healthConditionRepository.find();
    res.json(conditions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch health conditions" });
  }
};

export const getHealthConditionById = async (req: Request, res: Response) => {
  try {
    const condition = await healthConditionRepository.findOneBy({ condition_id: Number(req.params.id) });
    if (!condition) return res.status(404).json({ error: "Health condition not found" });
    res.json(condition);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch health condition" });
  }
};

export const createHealthCondition = async (req: Request, res: Response) => {
  try {
    const newCondition = healthConditionRepository.create(req.body);
    const result = await healthConditionRepository.save(newCondition);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create health condition" });
  }
};

export const updateHealthCondition = async (req: Request, res: Response) => {
  try {
    const condition = await healthConditionRepository.findOneBy({ condition_id: Number(req.params.id) });
    if (!condition) return res.status(404).json({ error: "Health condition not found" });
    healthConditionRepository.merge(condition, req.body);
    const result = await healthConditionRepository.save(condition);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update health condition" });
  }
};

export const deleteHealthCondition = async (req: Request, res: Response) => {
  try {
    const result = await healthConditionRepository.delete(Number(req.params.id));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete health condition" });
  }
};
