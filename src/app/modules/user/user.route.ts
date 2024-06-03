import { Router } from 'express';
import { validation } from '../../middleware/validation';
import { facultyValidation } from '../faculty/faculty.validator';
import { createStudentValidationSchema } from '../student/student.validator';
import { userController } from './user.controller';

const router = Router();

router
  .route('/create-student')
  .post(
    validation(createStudentValidationSchema),
    userController.createStudent,
  );

router
  .route('/create-faculty')
  .post(
    validation(facultyValidation.createFacultyValidationSchema),
    userController.createFaculty,
  );

export const userRouter = router;
