import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../database";
import { WorkerHealthCondition } from "../entities/WorkerHealthCondition";

const healthConditionRepository = AppDataSource.getRepository(WorkerHealthCondition);

export const getHealthConditions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const conditions = await healthConditionRepository.find();
    res.json(conditions);
  } catch (error) {
    next(new Error("Failed to fetch health conditions"));
  }
};

export const getHealthConditionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParam = req.params.id;
    if (!Number.isInteger(+idParam)) return res.status(400).json({ error: "Invalid id" });
    const condition = await healthConditionRepository.findOneBy({ condition_id: Number(idParam) });
    if (!condition) return res.status(404).json({ error: "Health condition not found" });
    res.json(condition);
  } catch (error) {
    next(new Error("Failed to fetch health condition"));
  }
};

export const createHealthCondition = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newCondition = healthConditionRepository.create(req.body);
    const result = await healthConditionRepository.save(newCondition);
    res.status(201).json(result);
  } catch (error) {
    next(new Error("Failed to create health condition"));
  }
};

export const updateHealthCondition = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParam = req.params.id;
    if (!Number.isInteger(+idParam)) return res.status(400).json({ error: "Invalid id" });
    const result = await healthConditionRepository.update(Number(idParam), req.body);
    if (result.affected === 0) return res.status(404).json({ error: "Health condition not found" });
    return res.status(204).send();
  } catch (error) {
    next(new Error("Failed to update health condition"));
  }
};

export const deleteHealthCondition = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParam = req.params.id;
    if (!Number.isInteger(+idParam)) return res.status(400).json({ error: "Invalid id" });
    const result = await healthConditionRepository.delete(Number(idParam));
    if (result.affected === 0) return res.status(404).json({ error: "Health condition not found" });
    return res.status(204).send();
  } catch (error) {
    next(new Error("Failed to delete health condition"));
  }
};
