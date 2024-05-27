import { ISemester } from './semester.interface';
import Semester from './semester.model';

const semesterSaveIntoDB = async (payload: ISemester) => {
  const semesterCode = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };

  payload.code = semesterCode[payload.name];

  const result = await Semester.create(payload);
  return result;
};

export const semesterService = {
  semesterSaveIntoDB,
};
