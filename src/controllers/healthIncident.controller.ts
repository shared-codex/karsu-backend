import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { WorkerHealthIncident } from "../entities/WorkerHealthIncident";

const healthIncidentRepository = AppDataSource.getRepository(WorkerHealthIncident);

export const getHealthIncidents = async (req: Request, res: Response) => {
  try {
    const incidents = await healthIncidentRepository.find();
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch health incidents" });
  }
};

export const getHealthIncidentById = async (req: Request, res: Response) => {
  try {
    const incident = await healthIncidentRepository.findOneBy({ incident_id: Number(req.params.id) });
    if (!incident) return res.status(404).json({ error: "Health incident not found" });
    res.json(incident);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch health incident" });
  }
};

export const createHealthIncident = async (req: Request, res: Response) => {
  try {
    const newIncident = healthIncidentRepository.create(req.body);
    const result = await healthIncidentRepository.save(newIncident);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create health incident" });
  }
};

export const updateHealthIncident = async (req: Request, res: Response) => {
  try {
    const incident = await healthIncidentRepository.findOneBy({ incident_id: Number(req.params.id) });
    if (!incident) return res.status(404).json({ error: "Health incident not found" });
    healthIncidentRepository.merge(incident, req.body);
    const result = await healthIncidentRepository.save(incident);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update health incident" });
  }
};

export const deleteHealthIncident = async (req: Request, res: Response) => {
  try {
    const result = await healthIncidentRepository.delete(Number(req.params.id));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete health incident" });
  }
};
