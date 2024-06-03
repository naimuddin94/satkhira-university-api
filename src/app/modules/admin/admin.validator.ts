import { Types } from 'mongoose';
import { z } from 'zod';
import { nameValidationSchema } from '../student/student.validator';

export const adminValidationSchema = z.object({
  id: z.string().optional(),
  designation: z.string(),
  name: nameValidationSchema,
  userId: z
    .preprocess((arg: unknown) => {
      if (typeof arg === 'string') {
        return new Types.ObjectId(arg);
      }
      return arg;
    }, z.instanceof(Types.ObjectId))
    .optional(),
  email: z.string().email({ message: 'Invalid email' }).optional(),
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z
    .preprocess((arg: unknown) => {
      if (typeof arg === 'string') {
        return new Date(arg);
      }
      return arg;
    }, z.date())
    .optional(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  profileImg: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

export const createAdminValidationSchema = z.object({
  email: z.string(),
  password: z.string().optional(),
  admin: adminValidationSchema,
});
