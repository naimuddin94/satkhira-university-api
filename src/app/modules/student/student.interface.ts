/* eslint-disable no-unused-vars */
import { HydratedDocument, Model } from 'mongoose';
import { z } from 'zod';
import {
  guardianValidationSchema,
  localGuardianValidationSchema,
  nameValidationSchema,
  studentValidationSchema,
} from './student.validator';

export interface IName extends z.infer<typeof nameValidationSchema> {}
export interface IGuardian extends z.infer<typeof guardianValidationSchema> {}
export interface ILocalGuardian
  extends z.infer<typeof localGuardianValidationSchema> {}
export interface IStudent extends z.infer<typeof studentValidationSchema> {}

export interface IStudentModel extends Model<IStudent, Record<string, never>> {
  isStudentExists(id: string): Promise<HydratedDocument<IStudent>>;
}
