import { IStudent } from './student.interface';
import Student from './student.model';

const saveStudentIntoDB = async (payload: IStudent) => {
  const result = await Student.create(payload);
  return result;
};

export const studentService = {
  saveStudentIntoDB,
};
