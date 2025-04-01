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
    const alert = await alertRepository.findOneBy({ alert_id: Number(req.params.id) });
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
    const alert = await alertRepository.findOneBy({ alert_id: Number(req.params.id) });
    if (!alert) return res.status(404).json({ error: "Alert not found" });
    alertRepository.merge(alert, req.body);
    const result = await alertRepository.save(alert);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update alert" });
  }
};

export const deleteAlert = async (req: Request, res: Response) => {
  try {
    const result = await alertRepository.delete(Number(req.params.id));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete alert" });
  }
};
