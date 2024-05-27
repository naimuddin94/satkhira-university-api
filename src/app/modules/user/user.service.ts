import { IUser } from './user.interface';
import User from './user.model';

const saveUserIntoDB = async (payload: IUser) => {
  return await User.create(payload);
};

export const userService = {
  saveUserIntoDB,
};
