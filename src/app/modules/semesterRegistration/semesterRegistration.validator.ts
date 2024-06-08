import { Types } from 'mongoose';
import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

export const semesterRegistrationValidationSchema = z.object({
  academicSemester: z.preprocess((arg: unknown) => {
    if (typeof arg === 'string') {
      return new Types.ObjectId(arg);
    }
    return arg;
  }, z.instanceof(Types.ObjectId)),
  status: z.enum(SemesterRegistrationStatus as [string]),
  startDate: z.preprocess((arg: unknown) => {
    if (typeof arg === 'string') {
      return new Date(arg);
    }
    return arg;
  }, z.date()),
  endDate: z.preprocess((arg: unknown) => {
    if (typeof arg === 'string') {
      return new Date(arg);
    }
    return arg;
  }, z.date()),
  minCredit: z.number(),
  maxCredit: z.number(),
});

export const updateSemesterRegistrationValidationSchema =
  semesterRegistrationValidationSchema.partial();
