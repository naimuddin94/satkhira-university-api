import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApiResponse, asyncHandler } from '../../utils';
import { studentService } from './student.service';

// Update student data controller
const updateStudent = asyncHandler(async (req: Request, res: Response) => {
  const studentData = req.body.student;
  const { studentId } = req.params;
  const result = await studentService.updateStudentIntoDB(
    studentId,
    studentData,
  );

  res
    .status(200)
    .json(new ApiResponse(200, result, 'Student updated successfully'));
});

const deleteStudent = asyncHandler(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await studentService.deleteStudentFromDB(studentId);

  return res
    .status(httpStatus.OK)
    .json(
      new ApiResponse(httpStatus.OK, result, 'Student deleted successfully'),
    );
});

const fetchAllStudents = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await studentService.fetchAllStudentFromDB(query);

  res
    .status(200)
    .json(new ApiResponse(200, result, 'Student retrieved successfully'));
});

export const studentController = {
  updateStudent,
  deleteStudent,
  fetchAllStudents,
};
