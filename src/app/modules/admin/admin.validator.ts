import { z } from 'zod';
import { nameValidationSchema } from '../student/student.validator';

const adminValidationSchema = z.object({
  designation: z.string(),
  name: nameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.preprocess((arg: unknown) => {
    if (typeof arg === 'string') {
      return new Date(arg);
    }
    return arg;
  }, z.date()).optional(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  profileImg: z.string(),
});

export const createAdminValidationSchema = z.object({
  email: z.string(),
  password: z.string().optional(),
  admin: adminValidationSchema,
});

