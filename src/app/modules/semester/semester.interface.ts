import { Model } from 'mongoose';
import { z } from 'zod';
import { semesterValidationSchema } from './semester.validator';

export interface ISemester extends z.infer<typeof semesterValidationSchema> {}
export interface ISemesterModel extends Model<ISemester> {}
