import { z } from 'zod';

export const academicFacultyValidationSchema = z.object({
  name: z.string({
    required_error: 'Academic faculty name must be required',
    invalid_type_error: 'Academic faculty name must be string',
  }),
});
