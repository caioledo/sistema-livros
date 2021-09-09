import { Router } from 'express';

import SessionController from '../controllers/SessionController';

const sessaoRouter = Router();
const sessionController = new SessionController();

sessaoRouter.post('/', sessionController.create);

export default sessaoRouter;
