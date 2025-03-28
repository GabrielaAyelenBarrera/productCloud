import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';
import authToken from '../middlewares/authToken.js';

const router = Router();

router.post('/register',sessionsController.register);
router.post('/login',sessionsController.login);
router.get('/current',authToken,sessionsController.current);
router.get('/unprotectedLogin',sessionsController.unprotectedLogin);
router.get('/unprotectedCurrent',sessionsController.unprotectedCurrent);

export default router;