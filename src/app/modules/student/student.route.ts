import { Router } from 'express';
import { studentController } from './student.controller';

const router = Router();

router.route('/:studentId').delete(studentController.deleteStudent);

export const studentRoute = router;
