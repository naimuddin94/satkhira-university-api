import { Types } from 'mongoose';
import { z } from 'zod';

export const nameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
    })
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  lastName: z.string({
    required_error: 'Last name is required',
  }),
});

export const guardianValidationSchema = z.object({
  fatherName: z.string({
    required_error: 'Father name is required',
  }),
  fatherOccupation: z.string({
    required_error: 'Father occupation is required',
  }),
  fatherContactNo: z.string({
    required_error: 'Father contact number is required',
  }),
  motherName: z.string({
    required_error: 'Mother name is required',
  }),
  motherOccupation: z.string({
    required_error: 'Mother occupation is required',
  }),
  motherContactNo: z.string({
    required_error: 'Mother contact number is required',
  }),
});

export const localGuardianValidationSchema = z.object({
  name: z.string({
    required_error: 'Local guardian name is required',
  }),
  occupation: z.string({
    required_error: 'Last name is required',
  }),
  contactNo: z.string({
    required_error: 'Local guardian contact number is required',
  }),
  address: z.string({
    required_error: 'Local guardian address is required',
  }),
});

export const studentValidationSchema = z.object({
  id: z.string().optional(),
  name: nameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.preprocess((arg: unknown) => {
    if (typeof arg === 'string') {
      return new Date(arg);
    }
    return arg;
  }, z.date()),
  contactNo: z.string(),
  userId: z
    .preprocess((arg: unknown) => {
      if (typeof arg === 'string') {
        return new Types.ObjectId(arg);
      }
      return arg;
    }, z.instanceof(Types.ObjectId))
    .optional(),
  emergencyContactNo: z.string({
    required_error: 'Emergency contact is required',
  }),
  presentAddress: z.string({ required_error: 'Present address is required' }),
  permanentAddress: z.string({
    required_error: 'Permanent address is required',
  }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  admissionSemester: z.preprocess((arg: unknown) => {
    if (typeof arg === 'string') {
      return new Types.ObjectId(arg);
    }
    return arg;
  }, z.instanceof(Types.ObjectId)),
  profileImg: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

export const createStudentValidationSchema = z.object({
  email: z.string(),
  password: z.string().optional(),
  student: studentValidationSchema,
});

export const updateStudentValidationSchema = z.object({
  student: studentValidationSchema.deepPartial(),
});
