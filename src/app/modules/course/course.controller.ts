import { ApiResponse, asyncHandler } from '../../utils';
import { CourseServices } from './course.service';

const createCourse = asyncHandler(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, result, 'Course created successfully'));
});

const getAllCourses = asyncHandler(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);

  return res
    .status(201)
    .json(new ApiResponse(201, result, 'Course retrieve successfully'));
});

const getSingleCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);

  return res
    .status(201)
    .json(new ApiResponse(201, result, 'Course fetched successfully'));
});

const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseIntoDB(id, req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, result, 'Course updated successfully'));
});

const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);

  return res
    .status(201)
    .json(new ApiResponse(201, result, 'Course deleted successfully'));
});

const assignFacultiesWithCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, result, 'Faculties assign successfully'));
});

const removeFacultiesInCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.removeFacultiesFromCourseIntoDB(
    courseId,
    faculties,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, result, 'Faculties remove successfully'));
});

export const CourseControllers = {
  createCourse,
  getSingleCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  removeFacultiesInCourse,
};
