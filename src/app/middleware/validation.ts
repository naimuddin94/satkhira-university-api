import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { ApiError } from '../utils';

export const validation =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        throw new ApiError(
          400,
          result.error.issues.map((err) => err.message).join(', '),
          result.error.issues,
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };
