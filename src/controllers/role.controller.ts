import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Role } from "../entities/Role";

const roleRepository = AppDataSource.getRepository(Role);

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await roleRepository.find({ relations: ["permissions"] });
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch roles" });
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!Number.isInteger(+idParam)) return res.status(400).json({ error: "Invalid id" });
    const role = await roleRepository.findOne({ where: { role_id: Number(idParam) }, relations: ["permissions"] });
    if (!role) return res.status(404).json({ error: "Role not found" });
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch role" });
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const newRole = roleRepository.create(req.body);
    const result = await roleRepository.save(newRole);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create role" });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!Number.isInteger(+idParam)) return res.status(400).json({ error: "Invalid id" });
    const result = await roleRepository.update(Number(idParam), req.body);
    if (result.affected === 0) return res.status(404).json({ error: "Role not found" });
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to update role" });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!Number.isInteger(+idParam)) return res.status(400).json({ error: "Invalid id" });
    const result = await roleRepository.delete(Number(idParam));
    if (result.affected === 0) return res.status(404).json({ error: "Role not found" });
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete role" });
  }
};
