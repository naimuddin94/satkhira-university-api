import { Request, Response } from 'express';
import { ApiResponse, asyncHandler } from '../../utils';
import { userService } from './user.service';

const createStudent = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.saveStudentIntoDB(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, result, 'Student created successfully'));
});

const createFaculty = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.saveFacultyIntoDB(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, result, 'Faculty created successfully'));
});

export const userController = {
  createStudent,
  createFaculty,
};
