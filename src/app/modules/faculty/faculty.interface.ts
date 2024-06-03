/* eslint-disable no-unused-vars */
import { HydratedDocument, Model } from 'mongoose';
import { z } from 'zod';
import { facultyValidationSchema } from './faculty.validator';

export interface IFaculty extends z.infer<typeof facultyValidationSchema> {}

export interface IFacultyModel extends Model<IFaculty, Record<string, never>> {
  isFacultyExists(id: string): Promise<HydratedDocument<IFaculty>>;
}
