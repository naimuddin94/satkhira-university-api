import { Router } from 'express';
import { createStudentValidationSchema } from '../student/student.validator';
import { userController } from './user.controller';
import { validation } from '../../middleware/validation';

const router = Router();

router
  .route('/create-student')
  .post(
    validation(createStudentValidationSchema),
    userController.createStudent,
  );

export const userRouter = router;
