import { Request, Response, NextFunction } from "express";

/**
 * Returns middleware that validates req.body[field] against allowedValues.
 * If the field is present and invalid, responds with 400 and an error message.
 */
export const validateEnum = (field: string, allowedValues: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = req.body[field];
    if (value !== undefined && !allowedValues.includes(value)) {
      return res
        .status(400)
        .json({
          error: `Invalid value for ${field}. Allowed values are: ${allowedValues.join(", ")}`,
        });
    }
    next();
  };
};

