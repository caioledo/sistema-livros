import { getRepository, Like } from 'typeorm';

import Livro from '../../modelos/Livro';

interface Request {
	nome: string;
}

class LivroListFilteredService {
	public async execute({ nome }: Request): Promise<Livro[]> {
		const repositorioLivros = getRepository(Livro);

		//const take = rowsPerPage || 10
		//const skip = (page * rowsPerPage) || 0

		let sqlWhere = '';
		
		sqlWhere += 'nome_livro ilike \'%' + nome + '%\'';// or ';
		//sqlWhere += 'nome_autor ilike \'%' + autor + '%\'';

		const livros = await repositorioLivros.find({
			where: sqlWhere,
			order: { nome_livro: 'ASC' },
			//take: take,
			//skip: skip
		});

		return livros;
	}
}

export default LivroListFilteredService;
