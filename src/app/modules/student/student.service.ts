/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { ApiError } from '../../utils';
import User from '../user/user.model';
import { IStudent } from './student.interface';
import Student from './student.model';

const saveStudentIntoDB = async (payload: IStudent) => {
  return await Student.create(payload);
};

const deleteStudentFromDB = async (id: string) => {
  const isExistStudent = await Student.isStudentExists(id);

  if (!isExistStudent) {
    throw new ApiError(404, 'Student does not exist');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const user = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!user) {
      throw new ApiError(500, 'Something went wrong when deleting user');
    }

    const student = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!student) {
      throw new ApiError(500, 'Something went wrong when deleting user');
    }

    await session.commitTransaction();
    await session.endSession();

    return { user, student };
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(
      error.status || 500,
      error.message || 'An error occurred while deleting the student',
    );
  }
};

const updateStudentIntoDB = async (id: string, payload: Partial<IStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifyData: Record<string, unknown> = { ...remainingStudentData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifyData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifyData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifyData[`localGuardian${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifyData, {
    new: true,
  });

  return result;
};

const fetchAllStudentFromDB = async (query: Record<string, unknown>) => {
  const queryObject = { ...query };
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchableFields = [
    'name.firstName',
    'email',
    'lastName',
    'presentAddress',
  ];

  const excludeFields = ['searchTerm', 'sort', 'page', 'limit'];

  excludeFields.forEach((field) => delete queryObject[field]);

  const searchQuery = Student.find({
    $or: searchableFields.map((field) => {
      return { [field]: { $regex: searchTerm, $options: 'i' } };
    }),
  });

  const filterQuery = searchQuery.find(queryObject).populate({
    path: 'userId admissionSemester',
    select: 'email role name year -_id',
  });

  let sort = '-createdAt';

  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let limit = 1;
  let skip = 0;
  const page = 1;

  if (query?.limit) {
    limit = Number(query.limit);
  }

  if (query?.page) {
    skip = (Number(query.page) - 1) * limit;
  }

  const skipQuery = await sortQuery.skip(skip).limit(limit);

  return skipQuery;
};

export const studentService = {
  saveStudentIntoDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
  fetchAllStudentFromDB,
};
