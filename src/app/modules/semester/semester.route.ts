import { Router } from 'express';
import { semesterController } from './semester.controller';

const router = Router();

router.route('/create').post(semesterController.createSemester);

export const semesterRouter = router;
