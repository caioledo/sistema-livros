import { getRepository } from 'typeorm';

import Livro from '../../modelos/Livro';

interface Request {
	nome_livro: string;
	nome_autor: string;
	detalhes: string;
	cadastrador: string;
}

class LivroCreateService {
	public async execute({ nome_livro, nome_autor, detalhes, cadastrador }: Request): Promise<Livro> {
		const repositorioLivros = getRepository(Livro);

		const livro = repositorioLivros.create({
			nome_livro,
			nome_autor,
			detalhes,
			cadastrador
		});

		await repositorioLivros.save(livro);
		return livro;
	}
}

export default LivroCreateService;
