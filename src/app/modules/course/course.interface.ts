import { z } from "zod";
import { courseValidationSchema, preRequisiteCourseValidationSchema } from "./course.validator";
import { Model } from "mongoose";

export interface IPreRequisiteCourse
  extends z.infer<typeof preRequisiteCourseValidationSchema> {}

export interface ICourse extends z.infer<typeof courseValidationSchema>{ }

export interface ICourseModel extends Model<ICourse>{}