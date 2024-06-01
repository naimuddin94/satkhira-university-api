import { Router } from 'express';
import { validation } from '../../middleware/validation';
import { studentController } from './student.controller';
import { updateStudentValidationSchema } from './student.validator';

const router = Router();

router.route('/').get(studentController.fetchAllStudents);

router
  .route('/:studentId')
  .delete(studentController.deleteStudent)
  .patch(
    validation(updateStudentValidationSchema),
    studentController.updateStudent,
  );

export const studentRoute = router;
