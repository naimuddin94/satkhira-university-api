import { Router } from 'express';
import { academicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { academicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { courseRouter } from '../modules/course/course.route';
import { facultyRouter } from '../modules/faculty/faculty.route';
import { semesterRouter } from '../modules/semester/semester.route';
import { semesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route';
import { studentRoute } from '../modules/student/student.route';
import { userRouter } from '../modules/user/user.route';
import { offeredCourseRoutes } from '../modules/offeredCourse/offeredCourse.route';

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
  {
    path: '/courses',
    route: courseRouter,
  },
  {
    path: '/semester-registrations',
    route: semesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: offeredCourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
