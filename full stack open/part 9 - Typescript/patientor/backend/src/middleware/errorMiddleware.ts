import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error) {
    // res.status(400).json({ error: error.issues });
    let errorMessage = "Something went wrong.";
    if (error instanceof ZodError) {
      errorMessage = "Incorrect or missing data";
    }
    res.status(400).send(errorMessage);
  } 
  else {
    next(error);
  }
};
