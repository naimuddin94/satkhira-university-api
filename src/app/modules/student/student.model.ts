import { Schema, model } from 'mongoose';
import {
  IGuardian,
  ILocalGuardian,
  IName,
  IStudent,
  IStudentModel,
} from './student.interface';

const nameSchema = new Schema<IName>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
    versionKey: false,
  },
);

const guardianSchema = new Schema<IGuardian>(
  {
    fatherName: {
      type: String,
      required: true,
    },
    fatherOccupation: {
      type: String,
      required: true,
    },
    fatherContactNo: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    motherOccupation: {
      type: String,
      required: true,
    },
    motherContactNo: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
    versionKey: false,
  },
);

const localGuardianSchema = new Schema<ILocalGuardian>(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
    versionKey: false,
  },
);

const studentSchema = new Schema<IStudent, IStudentModel>(
  {
    name: {
      type: nameSchema,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'Semester',
      required: true,
    },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

// Check that the student exists to database
studentSchema.statics.isStudentExists = async function (id: string) {
  const result = await Student.findOne({ id });
  return result;
};

const Student = model<IStudent, IStudentModel>('Student', studentSchema);

export default Student;
