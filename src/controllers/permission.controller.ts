import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Permission } from "../entities/Permission";

const permissionRepository = AppDataSource.getRepository(Permission);

export const getPermissions = async (req: Request, res: Response) => {
  try {
    const permissions = await permissionRepository.find();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch permissions" });
  }
};

export const getPermissionById = async (req: Request, res: Response) => {
  try {
    const permission = await permissionRepository.findOne({ where: { permission_id: Number(req.params.id) } });
    if (!permission) return res.status(404).json({ error: "Permission not found" });
    res.json(permission);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch permission" });
  }
};

export const createPermission = async (req: Request, res: Response) => {
  try {
    const newPermission = permissionRepository.create(req.body);
    const result = await permissionRepository.save(newPermission);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create permission" });
  }
};

export const updatePermission = async (req: Request, res: Response) => {
  try {
    const result = await permissionRepository.update(Number(req.params.id), req.body);
    if (result.affected === 0) return res.status(404).json({ error: "Permission not found" });
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to update permission" });
  }
};

export const deletePermission = async (req: Request, res: Response) => {
  try {
    const result = await permissionRepository.delete(Number(req.params.id));
    if (result.affected === 0) return res.status(404).json({ error: "Permission not found" });
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete permission" });
  }
};

