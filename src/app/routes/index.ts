import { Router } from 'express';
import { academicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { semesterRouter } from '../modules/semester/semester.route';
import { userRouter } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/semesters',
    route: semesterRouter,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
