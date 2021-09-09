import { Request, Response } from 'express';

import LivroCreateService from '../servicos/Livro/LivroCreateService';
import LivroListAllService from '../servicos/Livro/LivroListAllService';
import LivroListFilteredCountService from '../servicos/Livro/LivroListFilteredCountService';
import LivroListFilteredService from '../servicos/Livro/LivroListFilteredService';
import LivroGetService from '../servicos/Livro/LivroGetService';
import LivroUpdateService from '../servicos/Livro/LivroUpdateService';
import LivroDeleteService from '../servicos/Livro/LivroDeleteService';

export default class LivroController {
	public async create(request: Request, response: Response): Promise<Response> {
		try {
			const { 
				nomeLivro,
				nomeAutor,
				detalhes,
				cadastrador
			} = request.body;

			const livroCreate = new LivroCreateService();

			const livro = await livroCreate.execute({
				nome_livro: nomeLivro,
				nome_autor: nomeAutor,
				detalhes: detalhes,
				cadastrador: cadastrador
			});

			return response.json(livro);
		} catch (error) {
			return response.status(400).json({error}); //.status(400).json({ error: err.message })
		}
	}

	public async index(request: Request, response: Response): Promise<Response> {
		try {
			const { 
				nome
			} = request.body;
			
			const livroListFiltered = new LivroListFilteredService();

			const livros = await livroListFiltered.execute({ nome });

			return response.json(livros);
		} catch (error) {
			return response.status(400).json({error}); //.status(400).json({ error: err.message })
		}
	}

	public async count(request: Request, response: Response): Promise<Response> {
		try {
			const { 
				search
			} = request.body;

			const livroListFilteredCount = new LivroListFilteredCountService();

			const livrosCount = await livroListFilteredCount.execute({ search });

			return response.json({ count: livrosCount });
		} catch (error) {
			return response.status(400).json({error}); //.status(400).json({ error: err.message })
		}
	}

	public async select(request: Request, response: Response): Promise<Response> {
		try {
			const livroListAll = new LivroListAllService();

			const livros = await livroListAll.execute();

			return response.json(livros);
		} catch (error) {
			return response.status(400).json({error}); //.status(400).json({ error: err.message })
		}
	}

	public async get(request: Request, response: Response): Promise<Response> {
		const id = request.params.id;

		try {
			const livroGet = new LivroGetService();

			const livro = await livroGet.execute(id);

			return response.json(livro);
		} catch (error) {
			return response.status(400).json({error}); //.status(400).json({ error: err.message })
		}
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const id = request.params.id;

		const { 
			nomeLivro,
			nomeAutor,
			detalhes
		} = request.body;

		try {
			const livroUpdate = new LivroUpdateService();

			const livro = await livroUpdate.execute({
				id,
				nome_livro: nomeLivro,
				nome_autor: nomeAutor,
				detalhes: detalhes
			});

			return response.json(livro);
		} catch (error) {
			return response.status(400).json({error}); //.status(400).json({ error: err.message })
		}
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const id = request.params.id;

		try {
			const livroDelete = new LivroDeleteService();
			await livroDelete.execute(id);

			const livroListAll = new LivroListAllService();
			const livros = await livroListAll.execute();

			return response.json(livros);
		} catch (error) {
			return response.status(400).json({error}); //.status(400).json({ error: err.message })
		}
	}
}
