import { z } from 'zod';
import { semesterRegistrationValidationSchema } from './semesterRegistration.validator';

export interface ISemesterRegistration
  extends z.infer<typeof semesterRegistrationValidationSchema> {}
