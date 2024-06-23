import { Request, Response } from 'express';
import { ApiResponse, asyncHandler } from '../../utils';
import { userService } from './user.service';

// Controller function to create a student
// Uses asyncHandler to handle asynchronous errors
const createStudent = asyncHandler(async (req: Request, res: Response) => {
  // Calls the user service to save student data into the database
  const result = await userService.saveStudentIntoDB(req.body);

  // Sends a response with status 201 (Created) and a success message
  return res
    .status(201)
    .json(new ApiResponse(201, result, 'Student created successfully'));
});

// Controller function to create a faculty member
// Uses asyncHandler to handle asynchronous errors
const createFaculty = asyncHandler(async (req: Request, res: Response) => {
  // Calls the user service to save faculty data into the database
  const result = await userService.saveFacultyIntoDB(req.body);

  // Sends a response with status 201 (Created) and a success message
  return res
    .status(201)
    .json(new ApiResponse(201, result, 'Faculty created successfully'));
});

// Controller function to create an admin
// Uses asyncHandler to handle asynchronous errors
const createAdmin = asyncHandler(async (req: Request, res: Response) => {
  // Calls the user service to save admin data into the database
  const result = await userService.saveAdminIntoDB(req.body);

  // Sends a response with status 201 (Created) and a success message
  return res
    .status(201)
    .json(new ApiResponse(201, result, 'Admin created successfully'));
});

// Exporting the userController object containing all the controller functions
export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
};
