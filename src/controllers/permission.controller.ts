import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../database";
import { Permission } from "../entities/Permission";

const permissionRepository = AppDataSource.getRepository(Permission);

export const getPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const permissions = await permissionRepository.find();
    res.json(permissions);
  } catch (error) {
    next(new Error("Failed to fetch permissions"));
  }
};

export const getPermissionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParam = req.params.id;
    if (!Number.isInteger(+idParam)) return res.status(400).json({ error: "Invalid id" });
    const permission = await permissionRepository.findOne({ where: { permission_id: Number(idParam) } });
    if (!permission) return res.status(404).json({ error: "Permission not found" });
    res.json(permission);
  } catch (error) {
    next(new Error("Failed to fetch permission"));
  }
};

export const createPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newPermission = permissionRepository.create(req.body);
    const result = await permissionRepository.save(newPermission);
    res.status(201).json(result);
  } catch (error) {
    next(new Error("Failed to create permission"));
  }
};

export const updatePermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParam = req.params.id;
    if (!Number.isInteger(+idParam)) return res.status(400).json({ error: "Invalid id" });
    const result = await permissionRepository.update(Number(idParam), req.body);
    if (result.affected === 0) return res.status(404).json({ error: "Permission not found" });
    return res.status(204).send();
  } catch (error) {
    next(new Error("Failed to update permission"));
  }
};

export const deletePermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParam = req.params.id;
    if (!Number.isInteger(+idParam)) return res.status(400).json({ error: "Invalid id" });
    const result = await permissionRepository.delete(Number(idParam));
    if (result.affected === 0) return res.status(404).json({ error: "Permission not found" });
    return res.status(204).send();
  } catch (error) {
    next(new Error("Failed to delete permission"));
  }
};

