import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import UserController from '../controllers/UserController';
//import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userRouter = Router();
const userController = new UserController();

const upload = multer(uploadConfig);

userRouter.post('/', userController.create);

export default userRouter;
