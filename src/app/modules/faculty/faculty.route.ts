import { Router } from 'express';
import { facultyController } from './faculty.controller';

const router = Router();

router.route('/').get(facultyController.fetchAllFaculty);

export const facultyRouter = router;
