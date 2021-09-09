import { getRepository } from 'typeorm';

import Livro from '../../modelos/Livro';

interface Request {
	id: string;
	nome_livro: string;
	nome_autor: string;
	detalhes: string;
}

class LivroUpdateService {
	public async execute({ id, nome_livro, nome_autor, detalhes }: Request): Promise<Livro> {
		const repositorioLivros = getRepository(Livro);

		const livro = await repositorioLivros.findOne(id);

		if (!livro) {
			throw new Error('Livro não localizado.');
		}

		livro.nome_livro = nome_livro;
		livro.nome_autor = nome_autor;
		livro.detalhes = detalhes;

		await repositorioLivros.save(livro);

		return livro;
	}
}

export default LivroUpdateService;
