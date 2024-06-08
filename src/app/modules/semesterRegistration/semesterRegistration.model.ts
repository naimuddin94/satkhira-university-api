import mongoose, { Schema } from 'mongoose';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';
import {  ISemesterRegistration } from './semesterRegistration.interface';

const semesterRegistrationSchema = new mongoose.Schema<ISemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      enum: SemesterRegistrationStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
);

const SemesterRegistration = mongoose.model<ISemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);

export default SemesterRegistration;