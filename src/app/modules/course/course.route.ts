import express from 'express';
import { validation } from '../../middleware/validation';
import { CourseControllers } from './course.controller';
import {
  courseValidationSchema,
  createCourseFacultySchema,
  updateCourseValidationSchema,
} from './course.validator';

const router = express.Router();

router
  .route('/')
  .post(validation(courseValidationSchema), CourseControllers.createCourse)
  .get(CourseControllers.getAllCourses);

router
  .route('/:id')
  .get(CourseControllers.getSingleCourse)
  .patch(
    validation(updateCourseValidationSchema),
    CourseControllers.updateCourse,
  )
  .delete(CourseControllers.deleteCourse);

router
  .route('/:courseId/assign-faculties')
  .put(
    validation(createCourseFacultySchema),
    CourseControllers.assignFacultiesWithCourse,
  );

router
  .route('/:courseId/remove-faculties')
  .delete(
    validation(createCourseFacultySchema),
    CourseControllers.removeFacultiesInCourse,
  );

export const courseRouter = router;
