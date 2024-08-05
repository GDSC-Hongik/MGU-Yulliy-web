import { useMutation } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { del } from '~/libs/api';

type Request = {
	id: number;
};

type Response = {
	message: string | null;
	error: string | null;
};

export const delSearchQueryKey = (request: Request) => ['search', request];

const useDelSearch = () => {
	const mutation = useMutation<Response, Error, Request>({
		mutationFn: (request: Request) => {
			const config: AxiosRequestConfig = {
				data: request,
			};

			return del<Response>('/search/', config);
		},
	});

	return mutation;
};

export default useDelSearch;
