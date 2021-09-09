import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../servicos/api';

interface User {
	id: string;
	userName: string;
}

interface AuthState {
	token: string;
	user: User;
}

interface SignInCredentials {
	userName: string;
	userPassword: string;
}

interface AuthContextData {
	user: User;
	login(credentials: SignInCredentials): Promise<void>;
	signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
	const [data, setData] = useState<AuthState>(() => {
		const token = localStorage.getItem('@lupa:token');
		const user = localStorage.getItem('@lupa:user');

		if (token && user) {
			return { token, user: JSON.parse(user) };
		}

		return {} as AuthState;
	});

	const login = useCallback(async ({ userName, userPassword }) => {
		const response = await api.post('sessao', {
			userName,
			userPassword
		});

		const { token, user } = response.data;

		localStorage.setItem('@lupa:token', token);
		localStorage.setItem('@lupa:user', JSON.stringify(user));

		setData({ token, user });
	}, []);

	const signOut = useCallback(() => {
		localStorage.removeItem('@lupa:token');
		localStorage.removeItem('@lupa:user');

		setData({} as AuthState);
	}, []);

	return (
		<AuthContext.Provider value={{ user: data.user, login, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

function useAuth(): AuthContextData {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}

export { AuthProvider, useAuth };
