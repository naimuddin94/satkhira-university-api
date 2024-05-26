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
