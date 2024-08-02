import axios, { AxiosError, type AxiosResponse } from 'axios';

const baseURL = import.meta.env.VITE_SERVER_URL;
const instance = axios.create({
	baseURL,
	timeout: 15000,
});

const interceptorResponseFulfilled = (res: AxiosResponse) => {
	if (200 <= res.status && res.status < 300) {
		return res.data;
	}

	return Promise.reject(res.data);
};

const interceptorResponseRejected = (error: AxiosError) => {
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
