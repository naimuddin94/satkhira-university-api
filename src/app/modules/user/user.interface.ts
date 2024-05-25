import { z } from "zod";
import { userValidationSchema } from "./user.validator";
import { Model } from "mongoose";

export interface IUser extends z.infer<typeof userValidationSchema>{ }

export interface IUserModel extends Model<IUser>{}