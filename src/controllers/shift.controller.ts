import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { ShiftAttendance } from "../entities/ShiftAttendance";

const shiftRepository = AppDataSource.getRepository(ShiftAttendance);

export const getShifts = async (req: Request, res: Response) => {
  try {
    const shifts = await shiftRepository.find();
    res.json(shifts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch shifts" });
  }
};

export const getShiftById = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!Number.isInteger(+idParam)) return res.status(400).json({ error: "Invalid id" });
    const shift = await shiftRepository.findOneBy({ attendance_id: Number(idParam) });
    if (!shift) return res.status(404).json({ error: "Shift not found" });
    res.json(shift);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch shift" });
  }
};

export const createShift = async (req: Request, res: Response) => {
  try {
    const newShift = shiftRepository.create(req.body);
    const result = await shiftRepository.save(newShift);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create shift" });
  }
};

export const updateShift = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!Number.isInteger(+idParam)) return res.status(400).json({ error: "Invalid id" });
    const result = await shiftRepository.update(Number(idParam), req.body);
    if (result.affected === 0) return res.status(404).json({ error: "Shift not found" });
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to update shift" });
  }
};

export const deleteShift = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!Number.isInteger(+idParam)) return res.status(400).json({ error: "Invalid id" });
    const result = await shiftRepository.delete(Number(idParam));
    if (result.affected === 0) return res.status(404).json({ error: "Shift not found" });
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete shift" });
  }
};
