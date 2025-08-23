import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Alert } from "../entities/Alert";

const alertRepository = AppDataSource.getRepository(Alert);

export const getAlerts = async (req: Request, res: Response) => {
  try {
    const alerts = await alertRepository.find();
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
};

export const getAlertById = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!Number.isInteger(+idParam)) return res.status(400).json({ error: "Invalid id" });
    const alert = await alertRepository.findOneBy({ alert_id: Number(idParam) });
    if (!alert) return res.status(404).json({ error: "Alert not found" });
    res.json(alert);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch alert" });
  }
};

export const createAlert = async (req: Request, res: Response) => {
  try {
    const newAlert = alertRepository.create(req.body);
    const result = await alertRepository.save(newAlert);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create alert" });
  }
};

export const updateAlert = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!Number.isInteger(+idParam)) return res.status(400).json({ error: "Invalid id" });
    const result = await alertRepository.update(Number(idParam), req.body);
    if (result.affected === 0) return res.status(404).json({ error: "Alert not found" });
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to update alert" });
  }
};

export const deleteAlert = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!Number.isInteger(+idParam)) return res.status(400).json({ error: "Invalid id" });
    const result = await alertRepository.delete(Number(idParam));
    if (result.affected === 0) return res.status(404).json({ error: "Alert not found" });
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete alert" });
  }
};
