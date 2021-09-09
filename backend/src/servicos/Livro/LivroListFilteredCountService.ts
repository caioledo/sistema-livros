import { getRepository } from 'typeorm';

import Livro from '../../modelos/Livro';

interface Request {
	search: string;
}

class LivroListFilteredCountService {
	public async execute({ search }: Request): Promise<number> {
		const repositorioLivros = getRepository(Livro);

		let sqlWhere = '';
		
		sqlWhere += 'nome_livros ilike \'%' + search + '%\' or ';
		sqlWhere += 'nome_autors ilike \'%' + search + '%\'';

		const [livros, livrosCount] = await repositorioLivros.findAndCount({
			where: sqlWhere
		});

		return livrosCount;
	}
}

export default LivroListFilteredCountService;
