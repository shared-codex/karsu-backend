import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { SensorReading } from "../entities/SensorReading";

const sensorReadingRepository = AppDataSource.getRepository(SensorReading);

export const getSensorReadings = async (req: Request, res: Response) => {
  try {
    // Optional query filters for device and time range
    const { deviceId, fromTimestamp, toTimestamp } = req.query;
    let query = sensorReadingRepository.createQueryBuilder("sr");

    if (deviceId) {
      query = query.where("sr.device_id = :deviceId", { deviceId });
    }
    if (fromTimestamp && toTimestamp) {
      query = query.andWhere("sr.timestamp BETWEEN :fromTimestamp AND :toTimestamp", { fromTimestamp, toTimestamp });
    }
    const readings = await query.getMany();
    res.json(readings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sensor readings" });
  }
};

export const createSensorReading = async (req: Request, res: Response) => {
  try {
    const newReading = sensorReadingRepository.create(req.body);
    const result = await sensorReadingRepository.save(newReading);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create sensor reading" });
  }
};
