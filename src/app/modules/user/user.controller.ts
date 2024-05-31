import { Request, Response } from 'express';
import { ApiResponse, asyncHandler } from '../../utils';
import { userService } from './user.service';

const createStudent = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.saveUserIntoDB(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, result, 'Student created successfully'));
});

export const userController = {
  createStudent,
};
