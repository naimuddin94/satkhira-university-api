import { z } from "zod";
import { academicDepartmentValidationSchema } from "./academicDepartment.validator";

export interface IAcademicDepartment extends z.infer<typeof academicDepartmentValidationSchema>{}