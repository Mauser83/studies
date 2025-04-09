import { Request, Response, NextFunction } from "express";
import { newPatientSchema } from "../utils";
import { z } from "zod";

export const newPatientParser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues
        .map((issue) => issue.message)
        .join(", ");
      res.status(400).json({
        error: "Incorrect or missing data",
        message: "Error: " + errorMessages,
      });
      return;
    } else {
      next(error);
    }
  }
};
