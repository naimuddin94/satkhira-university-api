/* eslint-disable no-unused-vars */
import { HydratedDocument, Model } from 'mongoose';
import { z } from 'zod';
import { facultyValidation } from './faculty.validator';

export interface IFaculty
  extends z.infer<typeof facultyValidation.facultyValidationSchema> {}

export interface IFacultyModel extends Model<IFaculty, Record<string, never>> {
  isFacultyExists(id: string): Promise<HydratedDocument<IFaculty>>;
}
