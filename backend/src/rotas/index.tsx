import { Router } from 'express';

import userRouter from './user.rotas';
import sessaoRouter from './sessao.rotas';
import livroRouter from './livro.rotas';
//import menuOptionRouter from './menuOption.rotas';

const rotas = Router();

rotas.use('/user', userRouter);
rotas.use('/sessao', sessaoRouter);
rotas.use('/livro', livroRouter);
//rotas.use('/menu-option', menuOptionRouter);

export default rotas;
