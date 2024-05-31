import { z } from 'zod';

export const academicDepartmentValidationSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a valid string',
  }),
});

