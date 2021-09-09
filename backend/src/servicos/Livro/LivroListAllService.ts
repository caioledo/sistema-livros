import { getRepository } from 'typeorm';

import Livro from '../../modelos/Livro';

class LivroListAllService {
	public async execute(): Promise<Livro[]> {
		const repositorioLivros = getRepository(Livro);

		const livros = repositorioLivros.find({
			order: { nome_autor: 'ASC' }
		});

		return livros;
	}
}

export default LivroListAllService;
