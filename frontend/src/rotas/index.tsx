import React from 'react';
import { Switch } from 'react-router-dom';

import Rota from './Rota';

import Admin from '../paginas/Admin';
import Cliente from '../paginas/Cliente';
import Login from '../paginas/Login';
import Cadastro from '../paginas/Cadastro';

const Rotas: React.FC = () => (
	<Switch>
		<Rota path="/client" component={Cliente} isPrivate />
		<Rota path="/admin" component={Admin} isPrivate />
		<Rota path="/cadastro" component={Cadastro} />
		<Rota path="/" exact component={Login} />
	</Switch>
);

export default Rotas;
