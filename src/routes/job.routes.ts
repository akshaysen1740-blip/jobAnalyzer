import { Router } from 'express';

import {
  analyzeJobController,
} from '../controllers/job.controller';

const router = Router();

router.post('/analyze', analyzeJobController);

export default router;
