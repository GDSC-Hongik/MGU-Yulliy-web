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

	async function checkUser() {
		const token = localStorage.getItem('jwt_token'); // 로컬 스토리지에서 토큰 가져오기
		if (!token) {
			navigate('/login');
			return;
		}
		try {
			const res = await axios.get('/profile/', {
				headers: { Authorization: `Bearer ${token}` },
				withCredentials: true,
			});
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
		const response = await axios.post('/login/', {
			email: email,
			password: password,
		});
		const token = response.data.access_token; // 서버에서 JWT를 반환한다고 가정
		localStorage.setItem('jwt_token', token); // 로컬 스토리지에 토큰 저장
		await checkUser();
	}

	async function logout() {
		await axios.delete('/logout', { withCredentials: true });
		setUser(null);
	}

	useEffect(() => {
		checkUser();
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
