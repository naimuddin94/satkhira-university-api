import { Router } from 'express';
import { validation } from '../../middleware/validation';
import { academicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentValidationSchema } from './academicDepartment.validator';

const router = Router();

router
  .route('/')
  .post(
    validation(academicDepartmentValidationSchema),
    academicDepartmentController.createAcademicDepartment,
  )
  .get(academicDepartmentController.fetchAllAcademicDepartment);

router
  .route('/:departmentId')
  .get(academicDepartmentController.fetchSingleAcademicDepartment);

export const academicDepartmentRoute = router;
