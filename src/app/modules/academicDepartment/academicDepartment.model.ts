import { Schema, model } from 'mongoose';
import { ApiError } from '../../utils';
import { IAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  const isExists = await AcademicDepartment.findOne({ name: this.name });

  if (isExists) {
    throw new ApiError(400, 'Already exists academic department');
  }
  next();
});

const AcademicDepartment = model<IAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);

export default AcademicDepartment;
