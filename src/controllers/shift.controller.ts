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
    const shift = await shiftRepository.findOneBy({ attendance_id: Number(req.params.id) });
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
    const shift = await shiftRepository.findOneBy({ attendance_id: Number(req.params.id) });
    if (!shift) return res.status(404).json({ error: "Shift not found" });
    shiftRepository.merge(shift, req.body);
    const result = await shiftRepository.save(shift);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update shift" });
  }
};

export const deleteShift = async (req: Request, res: Response) => {
  try {
    const result = await shiftRepository.delete(Number(req.params.id));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete shift" });
  }
};
