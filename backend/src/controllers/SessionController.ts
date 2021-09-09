import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UserAuthenticateService from '../servicos/User/UserAuthenticateService';

export default class SessionController {
	public async create(request: Request, response: Response): Promise<Response> {
		try {
			const { userName, userPassword } = request.body;

			const userAuthenticate = new UserAuthenticateService();

			const { user, token } = await userAuthenticate.execute({
				user_name: userName,
				user_password: userPassword
			});

			return response.json({ user: classToClass(user), token });
		} catch (error) {
			return response.status(400).json({error}); //.status(400).json({ error: err.message });
		}
	}
}
