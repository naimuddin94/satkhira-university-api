import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApiError, ApiResponse, asyncHandler } from '../../utils';
import { academicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = asyncHandler(
  async (req: Request, res: Response) => {
    const department = req.body;

    const result =
      await academicDepartmentService.saveAcademicDepartmentIntoDB(department);
    if (!result) {
      throw new ApiError(500, 'Something went wrong when saving department');
    }

    return res
      .status(201)
      .json(new ApiResponse(201, result, 'Department created successfully'));
  },
);

const fetchAllAcademicDepartment = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await academicDepartmentService.fetchAllAcademicDepartment();
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Department not found');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, result, 'Department fetched successfully'));
  },
);

const fetchSingleAcademicDepartment = asyncHandler(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params;

    const result =
      await academicDepartmentService.fetchSingleAcademicDepartment(
        departmentId,
      );

    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Department not found');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, result, 'Department fetched successfully'));
  },
);

export const academicDepartmentController = {
  createAcademicDepartment,
  fetchAllAcademicDepartment,
  fetchSingleAcademicDepartment,
};
