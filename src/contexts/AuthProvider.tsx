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
}
import { useNavigate } from 'react-router-dom';
interface AuthContextType {
	user: User | null;
	login: (data: { email: string; password: string }) => Promise<void>;
	logout: () => Promise<void>;
	checkUser: () => Promise<void>;
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

	async function login({ email, password }: LoginProps) {
		const response = await axios.post('/login/', {
			email: email,
			password: password,
		});
		const accessToken = response.data.jwt_token.access_token;
		const refreshToken = response.data.jwt_token.refresh_token;
		localStorage.setItem('access_token', accessToken);
		localStorage.setItem('refresh_token', refreshToken);
		await checkUser();
		navigate('/');
	}

	async function checkUser() {
		const token = localStorage.getItem('access_token');
		if (!token) {
			navigate('/login');
			return;
		}
		try {
			const res = await axios.get('/profile/', {
				headers: { Authorization: `Bearer ${token}` },
				withCredentials: true,
			});
			if (res.data.id) {
				setUser(res.data.id);
				return;
			}
		} catch (error) {
			setUser(null);
			navigate('/login');
		}
	}

	async function logout() {
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		setUser(null);
	}

	useEffect(() => {
		if (user === null) {
			checkUser();
		}
	}, []);

	return (
		<AuthContext.Provider value={{ user, login, logout, checkUser }}>
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
