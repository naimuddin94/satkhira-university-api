import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';

interface IStudentData {
  user: IUser;
  student: IStudent;
}

const saveUserIntoDB = async (payload: IStudentData) => {
  console.log(payload);
};

export const userService = {
  saveUserIntoDB,
};
