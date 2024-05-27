import { Schema, model } from 'mongoose';
import { ISemester, ISemesterModel } from './semester.interface';

const semesterSchema = new Schema<ISemester, ISemesterModel>(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    startMonth: {
      type: Date,
      required: true,
    },
    endMonth: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

semesterSchema.pre('save', async function (next) {
  const result = await Semester.findOne({
    name: this.name,
    year: this.year,
  });

  if (result) {
    throw new Error('Semester must be unique');
  }

  next();
});

const Semester = model<ISemester, ISemesterModel>('Semester', semesterSchema);

export default Semester;
