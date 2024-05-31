import { IAcademicDepartment } from './academicDepartment.interface';
import AcademicDepartment from './academicDepartment.model';

const saveAcademicDepartmentIntoDB = async (payload: IAcademicDepartment) => {
  return await AcademicDepartment.create(payload);
};

const fetchSingleAcademicDepartment = async (id: string) => {
  return await AcademicDepartment.findById(id);
};

const fetchAllAcademicDepartment = async () => {
  return await AcademicDepartment.find();
};

export const academicDepartmentService = {
  saveAcademicDepartmentIntoDB,
  fetchSingleAcademicDepartment,
  fetchAllAcademicDepartment,
};
