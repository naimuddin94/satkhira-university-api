import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { config } from '../../config';
import { ApiError } from '../../utils';
import AcademicDepartment from '../academicDepartment/academicDepartment.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import Semester from '../semester/semester.model';
import { IStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { IUser } from './user.interface';
import User from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';

interface IPayload {
  email: string;
  password: string | undefined;
}

interface IStudentPayload extends IPayload {
  student: IStudent;
}

interface IFacultyPayload extends IPayload {
  faculty: IFaculty;
}

interface IAdminPayload extends IPayload {
  admin: IAdmin;
}

// Create new student into database
const saveStudentIntoDB = async (payload: IStudentPayload) => {
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
      password: password || config.default_password,
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
    student.userId = createdUser[0]._id;
    student.email = createdUser[0].email;

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

// Create new faculty into database
const saveFacultyIntoDB = async (payload: IFacultyPayload) => {
  const { email, password, faculty } = payload;

  const userData: Partial<IUser> = {};

  userData.email = email;
  userData.role = 'faculty';
  userData.password = password || config.default_password;

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    faculty.academicDepartment,
  );

  if (!academicDepartment) {
    throw new ApiError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateFacultyId();
    const createdUser = await User.create([userData], { session });

    if (!createdUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    faculty.id = createdUser[0].id;
    faculty.email = createdUser[0].email;
    faculty.userId = createdUser[0]._id;

    const createdFaculty = await Faculty.create([faculty], { session });

    if (!createdFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return createdFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

// Create new admin into database
const saveAdminIntoDB = async (payload: IAdminPayload) => {
  const { email, password, admin } = payload;
  const userData: Partial<IUser> = {};
  userData.email = email;
  userData.password = password || config.default_password;
  userData.role = 'admin';

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const adminId = await generateAdminId();
    userData.id = adminId;

    const createdUser = await User.create([userData], { session });

    if (!createdUser.length) {
      throw new ApiError(500, 'User creation failed');
    }

    admin.id = createdUser[0].id;
    admin.userId = createdUser[0]._id;
    admin.email = createdUser[0].email;

    const createdAdmin = await Admin.create([admin], { session });

    if (!createdAdmin.length) {
      throw new ApiError(500, 'Admin creation failed');
    }

    await session.commitTransaction();
    await session.endSession();

    return createdAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const userService = {
  saveStudentIntoDB,
  saveFacultyIntoDB,
  saveAdminIntoDB,
};
