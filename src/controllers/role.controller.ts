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
    const role = await roleRepository.findOne({ where: { role_id: Number(req.params.id) }, relations: ["permissions"] });
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
    const role = await roleRepository.findOneBy({ role_id: Number(req.params.id) });
    if (!role) return res.status(404).json({ error: "Role not found" });
    roleRepository.merge(role, req.body);
    const result = await roleRepository.save(role);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update role" });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const result = await roleRepository.delete(Number(req.params.id));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete role" });
  }
};
