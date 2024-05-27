import { Request, Response } from 'express';
import { config } from '../../config';
import { ApiError, ApiResponse, asyncHandler } from '../../utils';
import Semester from '../semester/semester.model';
import { IStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { userService } from './user.service';
import { generateStudentId } from './user.utils';

const createStudent = asyncHandler(async (req: Request, res: Response) => {
  const {
    email,
    password,
    student,
  }: { email: string; password: string | undefined; student: IStudent } =
    req.body;

  const semester = await Semester.findById(student.admissionSemester);

  if (!semester) {
    throw new ApiError(400, 'Please provide a valid semester id');
  }

  const studentId = await generateStudentId(semester);

  const user = {
    id: studentId,
    email,
    password: password || (config.default_password as string),
    role: 'student',
  };

  const createdUser = await userService.saveUserIntoDB(user);

  if (!createdUser) {
    throw new ApiError(
      500,
      'Something went wrong creating the user to the database',
    );
  }

  student.id = createdUser.id;

  const createdStudent = await Student.create(student);

  if (!createdStudent) {
    throw new ApiError(
      500,
      'Something went wrong creating the student to the database',
    );
  }

  const newUser = createdUser.toObject();

  delete newUser.password;

  const response = {
    ...newUser,
    ...createdStudent.toObject(),
  };

  return res
    .status(201)
    .json(new ApiResponse(201, response, 'Student created successfully'));
});

export const userController = {
  createStudent,
};
