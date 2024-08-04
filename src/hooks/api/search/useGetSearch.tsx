import { useQuery } from '@tanstack/react-query';
import { get } from '~/libs/api';
import { Histories } from '~/types/search';

const useGetSearch = () => {
	return useQuery<Histories>({
		queryKey: ['search'],
		queryFn: () => get('/search'),
	});
};

export default useGetSearch;
