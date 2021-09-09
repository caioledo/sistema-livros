import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UserCreateService from '../servicos/User/UserCreateService';

export default class UserController {
	public async create(request: Request, response: Response): Promise<Response> {
		try {
			const { 
				userName,
				userPassword
			} = request.body;

			const userCreate = new UserCreateService();

			const user = await userCreate.execute({
				user_name: userName,
				user_password: userPassword
			});

			return response.json(classToClass(user));
		} catch (error) {
			return response.status(400).json({error}); //.status(400).json({ error: error.message });
		}
	}
}
