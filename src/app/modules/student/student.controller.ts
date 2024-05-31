import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApiResponse, asyncHandler } from '../../utils';
import { studentService } from './student.service';

const deleteStudent = asyncHandler(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await studentService.deleteStudentFromDB(studentId);

  return res
    .status(httpStatus.OK)
    .json(
      new ApiResponse(httpStatus.OK, result, 'Student deleted successfully'),
    );
});

export const studentController = {
  deleteStudent,
};
