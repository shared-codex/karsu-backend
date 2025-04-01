import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Worker } from "../entities/Worker";

const workerRepository = AppDataSource.getRepository(Worker);

export const getWorkers = async (req: Request, res: Response) => {
  try {
    const workers = await workerRepository.find();
    res.json(workers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch workers" });
  }
};

export const getWorkerById = async (req: Request, res: Response) => {
  try {
    const worker = await workerRepository.findOneBy({ worker_id: Number(req.params.id) });
    if (!worker) return res.status(404).json({ error: "Worker not found" });
    res.json(worker);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch worker" });
  }
};

export const createWorker = async (req: Request, res: Response) => {
  try {
    const newWorker = workerRepository.create(req.body);
    const result = await workerRepository.save(newWorker);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create worker" });
  }
};

export const updateWorker = async (req: Request, res: Response) => {
  try {
    const worker = await workerRepository.findOneBy({ worker_id: Number(req.params.id) });
    if (!worker) return res.status(404).json({ error: "Worker not found" });
    workerRepository.merge(worker, req.body);
    const result = await workerRepository.save(worker);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update worker" });
  }
};

export const deleteWorker = async (req: Request, res: Response) => {
  try {
    const result = await workerRepository.delete(Number(req.params.id));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete worker" });
  }
};
