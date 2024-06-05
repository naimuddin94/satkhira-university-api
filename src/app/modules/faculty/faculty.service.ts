import QueryBuilder from '../../builder/QueryBuilder';
import { Faculty } from './faculty.model';

const fetchAllFaculty = async (query: Record<string, string>) => {
  const searchableFields = [
    'name.firstName',
    'firstName.lastName',
    'email',
    'permanentAddress',
    'presentAddress',
  ];
  const searchedData = new QueryBuilder(Faculty.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await searchedData.queryModel;

  return result;
};

export const facultyService = {
  fetchAllFaculty,
};
