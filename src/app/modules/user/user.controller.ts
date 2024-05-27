import { Request, Response } from 'express';
import { asyncHandler } from '../../utils';

const createStudent = asyncHandler(async (_req: Request, res: Response) => {
  res.send('Student created successfully');
});

export const userController = {
  createStudent,
};
