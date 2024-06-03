import { Types } from 'mongoose';
import { z } from 'zod';
import { nameValidationSchema } from '../student/student.validator';

const facultyValidationSchema = z.object({
  id: z.string().optional(),
  name: nameValidationSchema,
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'gender is required',
  }),
  dateOfBirth: z.preprocess((arg: unknown) => {
    if (typeof arg === 'string') {
      return new Date(arg);
    }
    return arg;
  }, z.date()),
  email: z.string().email({ message: 'Invalid email' }).optional(),
  userId: z
    .preprocess((arg: unknown) => {
      if (typeof arg === 'string') {
        return new Types.ObjectId(arg);
      }
      return arg;
    }, z.instanceof(Types.ObjectId))
    .optional(),
  contactNo: z
    .string({
      required_error: 'contactNo is required',
    })
    .regex(/^(?:\+8801|01)[3-9]\d{8}$/, {
      message: 'Invalid contact number',
    }),
  emergencyContactNo: z
    .string({
      required_error: 'contactNo is required',
    })
    .regex(/^(?:\+8801|01)[3-9]\d{8}$/, {
      message: 'Invalid emergency contact number',
    }),
  presentAddress: z.string({
    required_error: 'presentAddress is required',
  }),
  permanentAddress: z.string({
    required_error: 'permanentAddress is required',
  }),
  designation: z.string({
    required_error: 'designation is required',
  }),
  profileImage: z.string().url({ message: 'Invalid URL' }).optional(),
  academicFaculty: z
    .preprocess((arg: unknown) => {
      if (typeof arg === 'string') {
        return new Types.ObjectId(arg);
      }
      return arg;
    }, z.instanceof(Types.ObjectId))
    .optional(),
  academicDepartment: z
    .preprocess((arg: unknown) => {
      if (typeof arg === 'string') {
        return new Types.ObjectId(arg);
      }
      return arg;
    }, z.instanceof(Types.ObjectId))
    .optional(),
  isDeleted: z.boolean().default(false),
});

const createFacultyValidationSchema = z.object({
  email: z.string(),
  password: z.string().optional(),
  faculty: facultyValidationSchema,
});

export const facultyValidation = {
  facultyValidationSchema,
  createFacultyValidationSchema,
};
