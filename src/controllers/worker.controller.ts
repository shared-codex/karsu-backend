import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../database";
import { Worker } from "../entities/Worker";

const workerRepository = AppDataSource.getRepository(Worker);

export const getWorkers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const workers = await workerRepository.find();
    res.json(workers);
  } catch (error) {
    next(new Error("Failed to fetch workers"));
  }
};

export const getWorkerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParam = req.params.id;
    if (!Number.isInteger(+idParam)) return res.status(400).json({ error: "Invalid id" });
    const worker = await workerRepository.findOneBy({ worker_id: Number(idParam) });
    if (!worker) return res.status(404).json({ error: "Worker not found" });
    res.json(worker);
  } catch (error) {
    next(new Error("Failed to fetch worker"));
  }
};

export const createWorker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newWorker = workerRepository.create(req.body);
    const result = await workerRepository.save(newWorker);
    res.status(201).json(result);
  } catch (error) {
    next(new Error("Failed to create worker"));
  }
};

export const updateWorker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParam = req.params.id;
    if (!Number.isInteger(+idParam)) return res.status(400).json({ error: "Invalid id" });
    const result = await workerRepository.update(Number(idParam), req.body);
    if (result.affected === 0) return res.status(404).json({ error: "Worker not found" });
    return res.status(204).send();
  } catch (error) {
    next(new Error("Failed to update worker"));
  }
};

export const deleteWorker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParam = req.params.id;
    if (!Number.isInteger(+idParam)) return res.status(400).json({ error: "Invalid id" });
    const force = req.query.force === "true";
    if (!force) {
      const worker = await workerRepository.findOne({
        where: { worker_id: Number(idParam) },
        relations: [
          "assignments",
          "shifts",
          "healthConditions",
          "healthIncidents",
          "alerts",
        ],
      });
      if (!worker) return res.status(404).json({ error: "Worker not found" });
      if (
        worker.assignments.length ||
        worker.shifts.length ||
        worker.healthConditions.length ||
        worker.healthIncidents.length ||
        worker.alerts.length
      ) {
        return res
          .status(400)
          .json({ error: "Worker has related records. Use ?force=true to delete." });
      }
    }
    const result = await workerRepository.delete(Number(idParam));
    if (result.affected === 0) return res.status(404).json({ error: "Worker not found" });
    return res.status(204).send();
  } catch (error) {
    next(new Error("Failed to delete worker"));
  }
};
