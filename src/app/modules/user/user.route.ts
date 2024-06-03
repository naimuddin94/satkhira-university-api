import { Router } from 'express';
import { validation } from '../../middleware/validation';
import { createAdminValidationSchema } from '../admin/admin.validator';
import { createFacultyValidationSchema } from '../faculty/faculty.validator';
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
    validation(createFacultyValidationSchema),
    userController.createFaculty,
  );

router
  .route('/create-admin')
  .post(validation(createAdminValidationSchema), userController.createAdmin);

export const userRouter = router;
