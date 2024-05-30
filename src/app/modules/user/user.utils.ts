import { ISemester } from '../semester/semester.interface';
import Student from '../student/student.model';

const getStudentLastId = async (query: string) => {
  const result = await Student.findOne(
    { id: { $regex: query } },
    { _id: 0, id: 1 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return result?.id ? result.id : 0;
};

// 2030 03 0002

export const generateStudentId = async (semester: ISemester) => {
  let currentId = (1).toString().padStart(4, '0');

  const lastStudentId = (
    await getStudentLastId(`${semester.year}${semester.code}`)
  ).toString();

  const lastStudentYear = lastStudentId.substring(0, 4);
  const lastStudentSemesterCode = lastStudentId.substring(4, 6);
  const currentStudentYear = semester.year;
  const currentStudentSemesterCode = semester.code;

  if (
    lastStudentId &&
    lastStudentYear === currentStudentYear &&
    lastStudentSemesterCode === currentStudentSemesterCode
  ) {
    const id = Number(lastStudentId.substring(6)) + 1;
    currentId = id.toString().padStart(4, '0');
  }

  return `${currentStudentYear}${currentStudentSemesterCode}${currentId}`;
};
