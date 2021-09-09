import { Router } from 'express';

import LivroController from '../controllers/LivroController';
//import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const livroRouter = Router();
const livroController = new LivroController();

livroRouter.post('/', livroController.create);
livroRouter.post('/list', livroController.index);
livroRouter.post('/count', livroController.count);
livroRouter.get('/select', livroController.select);
livroRouter.get('/get/:id', livroController.get);
livroRouter.put('/:id', livroController.update);
livroRouter.delete('/:id', livroController.delete);

export default livroRouter;
