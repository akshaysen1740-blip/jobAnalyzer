import type { NextFunction, Request, Response } from "express";
import { analyzeJob } from "../services/job.service";

export const analyzeJobController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({
        message: "jobDescription is required",
      });
    }

    const result = await analyzeJob(jobDescription);

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};
