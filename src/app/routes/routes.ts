import { Router } from 'express';
import { academicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { academicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { facultyRouter } from '../modules/faculty/faculty.route';
import { semesterRouter } from '../modules/semester/semester.route';
import { studentRoute } from '../modules/student/student.route';
import { userRouter } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/students',
    route: studentRoute,
  },
  {
    path: '/semesters',
    route: semesterRouter,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRoute,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoute,
  },
  {
    path: '/faculties',
    route: facultyRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
