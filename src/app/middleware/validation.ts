import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validation =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      // const result = schema.safeParse(req.body);
      // if (!result.success) {
      //   throw new ApiError(
      //     400,
      //     result.error.issues.map((err) => err.message).join(', '),
      //     result.error.issues,
      //   );
      // }
      next();
    } catch (error) {
      next(error);
    }
  };
