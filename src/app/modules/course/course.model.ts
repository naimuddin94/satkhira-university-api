import { Schema, model } from 'mongoose';
import {
  ICourse,
  ICourseFaculty,
  ICourseModel,
  IPreRequisiteCourse,
} from './course.interface';

const preRequisiteCoursesSchema = new Schema<IPreRequisiteCourse>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    prefix: {
      type: String,
      trim: true,
      required: true,
    },
    code: {
      type: Number,
      trim: true,
      required: true,
    },
    credits: {
      type: Number,
      trim: true,
      required: true,
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const courseFacultySchema = new Schema<ICourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true,
    required: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});

export const CourseFaculty = model<ICourseFaculty>(
  'CourseFaculty',
  courseFacultySchema,
);

export const Course = model<ICourse, ICourseModel>('Course', courseSchema);
