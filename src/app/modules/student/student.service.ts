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

  const mmodifyData = { ...remainingStudentData }
  
  
};

export const studentService = {
  saveStudentIntoDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
