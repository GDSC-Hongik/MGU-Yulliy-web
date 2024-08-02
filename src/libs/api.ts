import axios, { AxiosError } from 'axios';

const baseURL = import.meta.env.VITE_SERVER_URL;

const instance = axios.create({
	baseURL,
	timeout: 15000,
});

instance.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		if (error.response && error.response.status === 401) {
			console.error('ERROR', error.toJSON());
		}
		return Promise.reject(error);
	},
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
