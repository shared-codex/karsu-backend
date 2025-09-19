import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../database";
import { SensorReadingAlt } from "../entities/SensorReadingAlt";

const sensorReadingAltRepository = AppDataSource.getRepository(SensorReadingAlt);

const parsePositiveInteger = (value: unknown, defaultValue: number): number => {
  if (value === undefined) return defaultValue;

  if (typeof value === "number" && Number.isInteger(value) && value > 0) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isInteger(parsed) && parsed > 0) {
      return parsed;
    }
  }

  throw new Error("Invalid pagination parameter");
};

export const createSensorReadingAlt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { value } = req.body ?? {};

    let moisture: number | undefined;
    if (typeof value === "number") {
      moisture = value;
    } else if (typeof value === "string" && value.trim() !== "") {
      const parsed = Number(value);
      moisture = Number.isFinite(parsed) ? parsed : undefined;
    }

    if (typeof moisture !== "number" || !Number.isFinite(moisture)) {
      return res.status(400).json({ error: "value must be a finite number" });
    }

    const newReading = sensorReadingAltRepository.create({ moisture });
    const savedReading = await sensorReadingAltRepository.save(newReading);

    return res.status(201).json(savedReading);
  } catch (error) {
    next(new Error("Failed to create alternative sensor reading"));
  }
};

export const getSensorReadingAlts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let page: number;
    let limit: number;

    try {
      page = parsePositiveInteger(req.query.page, 1);
      limit = parsePositiveInteger(req.query.limit, 10);
    } catch (validationError) {
      return res.status(400).json({ error: "page and limit must be positive integers" });
    }

    const [data, totalItems] = await sensorReadingAltRepository.findAndCount({
      order: { timestamp: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(totalItems / limit);

    return res.json({
      data,
      meta: {
        totalItems,
        totalPages,
        page,
        limit,
      },
    });
  } catch (error) {
    next(new Error("Failed to fetch alternative sensor readings"));
  }
};
