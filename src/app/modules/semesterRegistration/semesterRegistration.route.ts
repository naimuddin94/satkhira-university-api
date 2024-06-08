import express from 'express';
import { validation } from '../../middleware/validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import {
  semesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
} from './semesterRegistration.validator';

const router = express.Router();

router
  .route('/')
  .get(SemesterRegistrationController.getAllSemesterRegistrations)
  .post(
    validation(semesterRegistrationValidationSchema),
    SemesterRegistrationController.createSemesterRegistration,
  );

router
  .route('/:id')
  .get(SemesterRegistrationController.getSingleSemesterRegistration)
  .patch(
    validation(updateSemesterRegistrationValidationSchema),
    SemesterRegistrationController.updateSemesterRegistration,
  )
  .delete(SemesterRegistrationController.deleteSemesterRegistration);

export const semesterRegistrationRoutes = router;
