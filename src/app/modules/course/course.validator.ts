import { Types } from 'mongoose';
import { z } from 'zod';

export const preRequisiteCourseValidationSchema = z.object({
  course: z.preprocess((arg: unknown) => {
    if (typeof arg === 'string') {
      return new Types.ObjectId(arg);
    }
    return arg;
  }, z.instanceof(Types.ObjectId)),
  isDeleted: z.boolean().optional(),
});

export const courseValidationSchema = z.object({
  title: z.string(),
  prefix: z.string(),
  code: z.number(),
  credits: z.number(),
  preRequisiteCourses: z.array(preRequisiteCourseValidationSchema).optional(),
  isDeleted: z.boolean().optional(),
});

export const updatePreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

export const updateCourseValidationSchema =
  courseValidationSchema.deepPartial();

export const facultiesWithCourseValidationSchema = z.object({
  faculties: z.array(z.string()),
});
