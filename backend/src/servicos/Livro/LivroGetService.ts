import { getRepository } from 'typeorm';

import Livro from '../../modelos/Livro';

class LivroGetService {
	public async execute(id: string): Promise<Livro> {
		const repositorioLivros = getRepository(Livro);

		const livro = await repositorioLivros.findOne(id);

		if (!livro) {
			throw new Error('Livro não localizado.');
		}

		return livro;
	}
}

export default LivroGetService;
