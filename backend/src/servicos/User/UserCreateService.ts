import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../../modelos/User';

interface Request {
	user_name: string;
	user_password: string;
}

class UserCreateService {
	public async execute({ user_name, user_password }: Request): Promise<User> {
		const usersRepository = getRepository(User);

		const isAdmin = (user_name == "admin");

		const checkIfUserExists = await usersRepository.findOne({
			where: { user_name }
		});

		if (isAdmin || checkIfUserExists) {
			throw new Error('Username already exists.')
		}

		//const hashedPassword = await hash(user_password, 8);

		const user = usersRepository.create({
			user_name,
			user_password: user_password//hashedPassword
		});

		await usersRepository.save(user);

		return user;
	}
}

export default UserCreateService;
