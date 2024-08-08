import { useQuery } from '@tanstack/react-query';
import { post } from '~/libs/api';
import { Restaurants } from '~/types/restaurants';

type Request = {
	query: string;
};

export const postSearchQueryKey = (request: Request) => ['search', request];

const usePostSearch = (request: Request) => {
	return useQuery<Restaurants>({
		queryKey: postSearchQueryKey(request),
		queryFn: () => post<Restaurants>('/search/', request),
		enabled: false,
	});
};

export default usePostSearch;
