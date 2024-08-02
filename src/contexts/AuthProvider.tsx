import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react';
import axios from '../libs/axios';
interface User {
	id: number;
	email: string;
	password: string;
}

interface AuthContextType {
	user: User | null;
	login: (data: { email: string; password: string }) => Promise<void>;
	logout: () => Promise<void>;
}

interface AuthProviderProps {
	children: ReactNode;
}
interface LoginProps {
	email: string;
	password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState(null);

	async function getMe() {
		const res = await axios.get('/users/me');
		const nextUser = res.data;
		setUser(nextUser);
	}

	async function login({ email, password }: LoginProps) {
		await axios.post(
			'/auth/login',
			{ email, password },
			{ withCredentials: true },
		);
	}
	async function logout() {
		await axios.delete('/auth/logout', { withCredentials: true });
		setUser(null);
	}

	useEffect(() => {
		getMe();
	}, []);

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('잘못된 사용');
	}
	return context;
}
