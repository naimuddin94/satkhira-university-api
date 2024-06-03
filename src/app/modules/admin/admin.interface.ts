/* eslint-disable no-unused-vars */
import { HydratedDocument, Model } from 'mongoose';
import { z } from 'zod';
import { adminValidationSchema } from './admin.validator';

export interface IAdmin extends z.infer<typeof adminValidationSchema> {}

export interface IAdminModel extends Model<IAdmin> {
  isUserExists(id: string): Promise<HydratedDocument<IAdmin>>;
}
