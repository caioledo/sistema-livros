import { getRepository } from 'typeorm';

import Livro from '../../modelos/Livro';

interface Request {
	id: string;
	cadastrador: string;
}

class LivroDeleteService {
	public async execute(id: string): Promise<void> {
		const repositorioLivros = getRepository(Livro);

		const livro = await repositorioLivros.findOne(id);

		if (!livro) {
			throw new Error('Livro não localizado.');
		}

		await repositorioLivros.delete(id);
	}
}

export default LivroDeleteService;
