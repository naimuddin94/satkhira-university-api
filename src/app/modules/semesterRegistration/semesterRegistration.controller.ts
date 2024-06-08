import { Request, Response } from 'express';
import { ApiResponse, asyncHandler } from '../../utils';
import { SemesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = asyncHandler(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.createSemesterRegistrationIntoDB(
        req.body,
      );

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          result,
          'Semester Registration is created successfully!',
        ),
      );
  },
);

const getAllSemesterRegistrations = asyncHandler(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.getAllSemesterRegistrationsFromDB(
        req.query,
      );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          result,
          'Semester Registration retrieve successfully!',
        ),
      );
  },
);

const getSingleSemesterRegistration = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result =
      await SemesterRegistrationService.getSingleSemesterRegistrationsFromDB(
        id,
      );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          result,
          'Semester Registration retrieved successfully!',
        ),
      );
  },
);

const updateSemesterRegistration = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationService.updateSemesterRegistrationIntoDB(
        id,
        req.body,
      );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          result,
          'Semester Registration updated successfully!',
        ),
      );
  },
);

const deleteSemesterRegistration = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationService.deleteSemesterRegistrationFromDB(id);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          result,
          'Semester Registration deleted successfully!',
        ),
      );
  },
);

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
