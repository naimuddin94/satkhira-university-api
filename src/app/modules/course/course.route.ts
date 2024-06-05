import express from 'express';
import { validation } from '../../middleware/validation';
import { CourseControllers } from './course.controller';
import { courseValidationSchema } from './course.validator';

const router = express.Router();

router
  .route('/')
  .post(validation(courseValidationSchema), CourseControllers.createCourse)
  .get(CourseControllers.getAllCourses);

router
  .route('/:id')
  .get(CourseControllers.getSingleCourse)
  .delete(CourseControllers.deleteCourse);

export const CourseRoutes = router;
