import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Device } from "../entities/Device";

const deviceRepository = AppDataSource.getRepository(Device);

export const getDevices = async (req: Request, res: Response) => {
  try {
    const devices = await deviceRepository.find();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch devices" });
  }
};

export const getDeviceById = async (req: Request, res: Response) => {
  try {
    const device = await deviceRepository.findOneBy({ device_id: req.params.id });
    if (!device) return res.status(404).json({ error: "Device not found" });
    res.json(device);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch device" });
  }
};

export const createDevice = async (req: Request, res: Response) => {
  try {
    const newDevice = deviceRepository.create(req.body);
    const result = await deviceRepository.save(newDevice);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create device" });
  }
};

export const updateDevice = async (req: Request, res: Response) => {
  try {
    const device = await deviceRepository.findOneBy({ device_id: req.params.id });
    if (!device) return res.status(404).json({ error: "Device not found" });
    deviceRepository.merge(device, req.body);
    const result = await deviceRepository.save(device);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update device" });
  }
};

export const deleteDevice = async (req: Request, res: Response) => {
  try {
    const result = await deviceRepository.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete device" });
  }
};
