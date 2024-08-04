import { useQuery } from '@tanstack/react-query';
import { post } from '~/libs/api';
import { tempRestaurant } from '~/store/restaurants';

type Request = {
	query: string;
};

type Response = tempRestaurant;

export const postSearchQueryKey = (request: Request) => ['search', request];

const usePostSearch = (request: Request) => {
	return useQuery<Response>({
		queryKey: postSearchQueryKey(request),
		queryFn: () => post<Response>('/search/', request),
		enabled: false,
	});
};

export default usePostSearch;