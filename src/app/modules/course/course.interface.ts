import { z } from "zod";
import { courseValidationSchema, createCourseFacultySchema, preRequisiteCourseValidationSchema } from "./course.validator";
import { Model, Types } from "mongoose";

export interface IPreRequisiteCourse
  extends z.infer<typeof preRequisiteCourseValidationSchema> {}

export interface ICourse extends z.infer<typeof courseValidationSchema>{ }

export interface ICourseModel extends Model<ICourse>{ }

export interface ICourseFaculty extends z.infer<typeof createCourseFacultySchema>{
  course: Types.ObjectId
}