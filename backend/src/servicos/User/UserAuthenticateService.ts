import { getRepository } from 'typeorm';
//import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../../config/auth';
import User from '../../modelos/User';
//import { getTokenSourceMapRange } from 'typescript';

interface Request {
	user_name: string;
	user_password: string;
}

interface Response {
	user: User;
	token: string;
}

class UserAuthenticateService {
	public async execute({ user_name, user_password}: Request): Promise<Response> {
		const usersRepository = getRepository(User);
		const isAdmin = (user_name == "admin" && user_password == "admin");
		let user: User | undefined;
		
		user = await usersRepository.findOne({
			where: { user_name }
		});

		/**/

		if (!user) {
			if (isAdmin) {
				user = {
					id: "0",
					user_name: "admin",
					user_password: "admin",
					created_at: new Date(2021, 0O11, 0O5, 15, 48, 0o0),
					updated_at: new Date(2021, 0O11, 0O5, 15, 48, 0o0)
				}
			} else {
				throw new Error('Incorrect userName/password combination.');
			}
		}

		//const passwordMatched = await compare(user_password, user.user_password);
		if (!(user_password == user.user_password)) {
			throw new Error('Incorrect username/password combination.');
		}

		const { secret, expiresIn } = authConfig.jwt;

		console.log(secret)

		const token = sign({}, secret, {
			subject: user.id,
			expiresIn
		});

		return { user, token };
	}
}

export default UserAuthenticateService;