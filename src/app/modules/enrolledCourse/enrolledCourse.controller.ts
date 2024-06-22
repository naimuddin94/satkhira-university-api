import { ApiResponse, asyncHandler } from '../../utils';
import { EnrolledCourseServices } from './enrolledCourse.service';

const createEnrolledCourse = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    id,
    req.body,
  );

  res
    .status(201)
    .json(new ApiResponse(201, result, 'Student is enrolled successfully'));
});

const getMyEnrolledCourses = asyncHandler(async (req, res) => {
  const { id } = req.user;

  const result = await EnrolledCourseServices.getMyEnrolledCoursesFromDB(
    id,
    req.query,
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { data: result.result },
        'Enrolled courses are retrieved successfully',
      ),
    );
});

const updateEnrolledCourseMarks = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(
    id,
    req.body,
  );

  res
    .status(200)
    .json(new ApiResponse(200, result, 'Marks is updated succesfully'));
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  getMyEnrolledCourses,
  updateEnrolledCourseMarks,
};
