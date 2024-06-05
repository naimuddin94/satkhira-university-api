import { Request, Response } from 'express';
import { ApiError, ApiResponse, asyncHandler } from '../../utils';
import { facultyService } from './faculty.service';

const fetchAllFaculty = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as Record<string, string>;
  const result = await facultyService.fetchAllFaculty(query);
  if (!result) {
    throw new ApiError(404, 'Faculty not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, 'Faculty retrieved successfully'));
});

export const facultyController = {
  fetchAllFaculty,
};
