import { useQuery } from '@tanstack/react-query';
import { get } from '~/libs/api';
import { Restaurant } from '~/types/restaurants';

type Response = {
	results: Restaurant[];
};

const useGetRestaurants = () => {
	return useQuery<Response>({
		queryKey: ['restaurants'],
		queryFn: () => get('/restaurants'),
	});
};

export default useGetRestaurants;
