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
import { useNavigate } from 'react-router-dom';
interface AuthContextType {
	user: User | null;
	login: (data: { email: string; password: string }) => Promise<void>;
	logout: () => Promise<void>;
	checkuser: () => Promise<void>;
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
	const navigate = useNavigate();

	async function checkuser() {
		try {
			const res = await axios.get('/users/me');
			if (res.data) {
				setUser(res.data);
				return;
			}
		} catch (error) {
			setUser(null);
			navigate('/login');
		}
	}

	async function login({ email, password }: LoginProps) {
		await axios.post(
			'/auth/login',
			{ email, password },
			{ withCredentials: true },
		);
		await checkuser();
	}
	async function logout() {
		await axios.delete('/auth/logout', { withCredentials: true });
		setUser(null);
	}

	useEffect(() => {
		checkuser();
	}, []);

	return (
		<AuthContext.Provider value={{ user, login, logout, checkuser }}>
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
