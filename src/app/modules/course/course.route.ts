import express from 'express';
import { validation } from '../../middleware/validation';
import { CourseControllers } from './course.controller';
import {
  courseValidationSchema,
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

export const courseRouter = router;
