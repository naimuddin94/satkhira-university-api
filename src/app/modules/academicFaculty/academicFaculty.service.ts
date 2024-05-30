import { IAcademicFaculty } from './academicFaculty.interface';
import AcademicFaculty from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: IAcademicFaculty) => {
  return await AcademicFaculty.create(payload);
};

const fetchSingleAcademicFacultyFromDB = async (facultyId: string) => {
  return await AcademicFaculty.findById(facultyId);
};

const fetchAllAcademicFacultyFromDB = async () => {
  return await AcademicFaculty.find();
};

const updateAcademicFacultyIntoDB = async (
  facultyId: string,
  payload: IAcademicFaculty,
) => {
  return await AcademicFaculty.findByIdAndUpdate(facultyId, payload);
};

export const academicFacultyService = {
  createAcademicFacultyIntoDB,
  fetchSingleAcademicFacultyFromDB,
  fetchAllAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
