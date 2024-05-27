import { z } from 'zod';

export const semesterValidationSchema = z.object({
  name: z.enum(['Autumn', 'Summer', 'Fall']),
  year: z
    .string({
      required_error: 'Year is required',
      invalid_type_error: 'Year must be a valid string',
    })
    .min(4, { message: 'Year must be at least 4 characters' })
    .max(4, { message: 'Invalid year string' }),
  code: z.string().optional(),
  startMonth: z.preprocess((arg: unknown) => {
    if (typeof arg === 'string') {
      return new Date(arg);
    }
    return arg;
  }, z.date()),
  endMonth: z.preprocess((arg: unknown) => {
    if (typeof arg === 'string') {
      return new Date(arg);
    }
    return arg;
  }, z.date()),
});
