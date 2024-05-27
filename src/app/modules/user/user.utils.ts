import { ISemester } from '../semester/semester.interface';
import Student from '../student/student.model';

const getStudentLastId = async () => {
  const result = await Student.findOne({}, { _id: 0, id: 1 })
    .sort({ createdAt: -1 })
    .lean();

  return result?.id ? Number(result.id.substring(6)) : 0;
};

export const generateStudentId = async (semester: ISemester) => {
  const currentId = (await getStudentLastId()) + 1;

  const id = currentId.toString().padStart(4, '0');

  return `${semester.year}${semester.code}${id}`;
};
