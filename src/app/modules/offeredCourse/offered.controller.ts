import { Request, Response } from 'express';
import { ApiResponse, asyncHandler } from '../../utils';
import { OfferedCourseServices } from './offeredCourse.service';

const createOfferedCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await OfferedCourseServices.createOfferedCourseIntoDB(
      req.body,
    );
    return res
      .status(201)
      .json(
        new ApiResponse(201, result, 'Offered courses created successfully'),
      );
  },
);

const getAllOfferedCourses = asyncHandler(
  async (req: Request, res: Response) => {
    //   const result =
    //  return res
    //    .status(201)
    //    .json(
    //      new ApiResponse(201, result, 'Offered courses created successfully'),
    //    );
  },
);

const getSingleOfferedCourses = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    //   const result =
    // return res
    //   .status(201)
    //   .json(
    //     new ApiResponse(201, result, 'Offered courses created successfully'),
    //   );
  },
);

const updateOfferedCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
      id,
      req.body,
    );
     return res
       .status(200)
       .json(
         new ApiResponse(200, result, 'Offered courses updated successfully'),
       );
  },
);

const deleteOfferedCourseFromDB = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OfferedCourseServices.deleteOfferedCourseFromDB(id);
    return res
      .status(201)
      .json(
        new ApiResponse(201, result, 'Offered courses deleted successfully'),
      );
  },
);

export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourses,
  updateOfferedCourse,
  deleteOfferedCourseFromDB,
};
