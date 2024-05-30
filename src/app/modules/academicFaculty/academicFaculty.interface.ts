import { z } from 'zod';
import { academicFacultyValidationSchema } from './academicFaculty.validator';

export interface IAcademicFaculty
  extends z.infer<typeof academicFacultyValidationSchema> {}
