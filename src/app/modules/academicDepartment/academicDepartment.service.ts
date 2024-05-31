import { IAcademicDepartment } from './academicDepartment.interface';
import AcademicDepartment from './academicDepartment.model';

const saveAcademicDepartmentIntoDB = async (payload: IAcademicDepartment) => {
  return await AcademicDepartment.create(payload);
};

const fetchSingleAcademicDepartment = async (id: string) => {
  return await AcademicDepartment.findById(id).populate({
    path: 'academicFaculty',
    transform: (data) => {
      return data.name;
    },
  });
};

const fetchAllAcademicDepartment = async () => {
  return await AcademicDepartment.find().populate({
    path: 'academicFaculty',
    transform: (data) => {
      return data.name;
    },
  });
};

export const academicDepartmentService = {
  saveAcademicDepartmentIntoDB,
  fetchSingleAcademicDepartment,
  fetchAllAcademicDepartment,
};
