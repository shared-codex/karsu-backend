import { Request, Response, NextFunction } from "express";

/**
 * Middleware factory that checks if the user’s role contains the required permission.
 * @param permission - The permission string (e.g., "CREATE_WORKER")
 */
export function checkPermission(permission: string) {
  return (req: Request & {user: any}, res: Response, next: NextFunction) => { // TODO: define user type properly
    // Assuming authentication middleware has set req.user
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Here we assume user.role is loaded and includes a 'permissions' array.
    const role = user.role;
    if (!role || !role.permissions) {
      return res.status(403).json({ error: "Forbidden: No role or permissions assigned" });
    }

    const hasPermission = role.permissions.some((p: { name: string }) => p.name === permission);
    if (!hasPermission) {
      return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
    }

    next();
  };
}
