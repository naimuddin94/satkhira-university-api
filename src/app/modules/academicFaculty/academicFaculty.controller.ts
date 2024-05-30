import { Request, Response } from 'express';
import { ApiError, ApiResponse, asyncHandler } from '../../utils';
import { academicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = asyncHandler(
  async (req: Request, res: Response) => {
    const academicFacultyData = req.body;

    const result =
      await academicFacultyService.createAcademicFacultyIntoDB(
        academicFacultyData,
      );

    if (!result) {
      throw new ApiError(500, 'Something went wrong creating academic faculty');
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, result, 'Academic faculty created successfully'),
      );
  },
);

const fetchSingleAcademicFaculty = asyncHandler(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params;
    const result =
      await academicFacultyService.fetchSingleAcademicFacultyFromDB(facultyId);

    if (!result) {
      throw new ApiError(404, 'Academic faculty not found');
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, result, 'Academic faculty fetched successfully'),
      );
  },
);

const fetchAllAcademicFaculty = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await academicFacultyService.fetchAllAcademicFacultyFromDB();

    if (!result) {
      throw new ApiError(404, 'Academic faculty not found');
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, result, 'Academic faculties fetched successfully'),
      );
  },
);

const updateAcademicFaculty = asyncHandler(
  async (req: Request, res: Response) => {
    const academicFacultyData = req.body;
    const { facultyId } = req.params;
    const result = await academicFacultyService.updateAcademicFacultyIntoDB(
      facultyId,
      academicFacultyData,
    );

    if (!result) {
      throw new ApiError(
        500,
        'Something went wrong while updating academic faculty',
      );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, result, 'Academic faculty update successfully'),
      );
  },
);

export const academicFacultyController = {
  createAcademicFaculty,
  fetchSingleAcademicFaculty,
  fetchAllAcademicFaculty,
  updateAcademicFaculty,
};
