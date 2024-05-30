import { Router } from 'express';
import { validation } from '../../middleware/validation';
import { academicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidationSchema } from './academicFaculty.validator';

const router = Router();

router
  .route('/')
  .post(
    validation(academicFacultyValidationSchema),
    academicFacultyController.createAcademicFaculty,
  )
  .get(academicFacultyController.fetchAllAcademicFaculty);

router
  .route('/:facultyId')
  .get(academicFacultyController.fetchSingleAcademicFaculty)
  .put(academicFacultyController.updateAcademicFaculty);

export const academicFacultyRoute = router;
