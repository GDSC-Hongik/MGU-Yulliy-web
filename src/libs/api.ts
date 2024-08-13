import axios, {
	AxiosError,
	InternalAxiosRequestConfig,
	type AxiosResponse,
} from 'axios';

const baseURL = import.meta.env.VITE_SERVER_URL;
const instance = axios.create({
	baseURL,
	timeout: 15000,
	withCredentials: true,
});

instance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('access_token');
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

const interceptorResponseFulfilled = (res: AxiosResponse) => {
	if (200 <= res.status && res.status < 300) {
		return res.data;
	}

	return Promise.reject(res.data);
};

const interceptorResponseRejected = async (error: AxiosError) => {
	const originalRequest = error.config as InternalAxiosRequestConfig & {
		_retry?: boolean;
	};

	if (
		originalRequest &&
		error.response?.status === 401 &&
		!originalRequest._retry
	) {
		originalRequest._retry = true;
		try {
			const refreshToken = localStorage.getItem('refresh_token');
			if (!refreshToken) {
				throw new Error('No refresh token available');
			}
			const response = await axios.post(`${baseURL}refresh/`, {
				token: refreshToken,
			});
			const newAccessToken = response.data.access_token;
			localStorage.setItem('access_token', newAccessToken);

			originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

			return instance(originalRequest);
		} catch (refreshError) {
			return Promise.reject(refreshError);
		}
	}

	return Promise.reject(error);
};

instance.interceptors.response.use(
	interceptorResponseFulfilled,
	interceptorResponseRejected,
);

export const get = <T>(...args: Parameters<typeof instance.get>) => {
	return instance.get<T, T>(...args);
};

export const post = <T>(...args: Parameters<typeof instance.post>) => {
	return instance.post<T, T>(...args);
};

export const put = <T>(...args: Parameters<typeof instance.put>) => {
	return instance.put<T, T>(...args);
};

export const patch = <T>(...args: Parameters<typeof instance.patch>) => {
	return instance.patch<T, T>(...args);
};

export const del = <T>(...args: Parameters<typeof instance.delete>) => {
	return instance.delete<T, T>(...args);
};
