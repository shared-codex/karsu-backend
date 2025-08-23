import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Device, DeviceStatus } from "../entities/Device";

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
    const { status, ...data } = req.body;
    if (status && !Object.values(DeviceStatus).includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const deviceStatus = status as DeviceStatus | undefined;
    const newDevice = deviceRepository.create({ ...data, status: deviceStatus });
    const result = await deviceRepository.save(newDevice);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create device" });
  }
};

export const updateDevice = async (req: Request, res: Response) => {
  try {
    const { status, ...data } = req.body;
    if (status && !Object.values(DeviceStatus).includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const deviceStatus = status as DeviceStatus | undefined;
    const result = await deviceRepository.update(req.params.id, { ...data, status: deviceStatus });
    if (result.affected === 0) return res.status(404).json({ error: "Device not found" });
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to update device" });
  }
};

export const deleteDevice = async (req: Request, res: Response) => {
  try {
    const result = await deviceRepository.delete(req.params.id);
    if (result.affected === 0) return res.status(404).json({ error: "Device not found" });
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete device" });
  }
};
