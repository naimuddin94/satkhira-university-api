import mongoose from 'mongoose';
import { config } from '../../config';
import { ApiError } from '../../utils';
import Semester from '../semester/semester.model';
import { IStudent } from '../student/student.interface';
import Student from '../student/student.model';
import User from './user.model';
import { generateStudentId } from './user.utils';

interface IPayload {
  email: string;
  password: string | undefined;
  student: IStudent;
}

const saveUserIntoDB = async (payload: IPayload) => {
  const { email, password, student } = payload;
  const semester = await Semester.findById(student.admissionSemester);

  if (!semester) {
    throw new ApiError(400, 'Please provide a valid semester id');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const studentId = await generateStudentId(semester);

    const user = {
      id: studentId,
      email,
      password: password || (config.default_password as string),
      role: 'student',
    };
    const createdUser = await User.create([user], { session });

    if (!createdUser.length) {
      throw new ApiError(
        500,
        'Something went wrong creating the user to the database',
      );
    }

    student.id = createdUser[0].id;

    const createdStudent = await Student.create([student], { session });

    if (!createdStudent.length) {
      throw new ApiError(
        500,
        'Something went wrong creating the student to the database',
      );
    }

    const newUser = createdUser[0].toObject();

    delete newUser.password;

    const response = {
      ...newUser,
      ...createdStudent[0].toObject(),
    };

    await session.commitTransaction();
    await session.endSession();

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
    // throw new ApiError(
    //   error.status || 500,
    //   error.message || 'Something went wrong during creating a new student',
    // );
  }
};

export const userService = {
  saveUserIntoDB,
};
