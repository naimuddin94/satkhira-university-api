import { Request, Response } from 'express';
import { ApiError, ApiResponse, asyncHandler } from '../../utils';
import { semesterService } from './semester.service';

const createSemester = asyncHandler(async (req: Request, res: Response) => {
  const semester = req.body;

  const result = await semesterService.semesterSaveIntoDB(semester);

  if (!result) {
    throw new ApiError(400, 'Something went wrong saving the semester');
  }

  return res
    .status(201)
    .json(new ApiResponse(201, result, 'Semester saved successfully'));
});

export const semesterController = { createSemester };
