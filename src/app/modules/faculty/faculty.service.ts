import { ApiError } from '../../utils';
import { IFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

const saveFacultyIntoDB = async (payload: IFaculty) => {
  const isExistsFaculty = await Faculty.isFacultyExists(payload.id as string);

  if (isExistsFaculty) {
    throw new ApiError(400, 'Faculty already exists');
  }

  const result = await Faculty.create(payload);
  return result;
};

export const facultyService = {
  saveFacultyIntoDB,
};
