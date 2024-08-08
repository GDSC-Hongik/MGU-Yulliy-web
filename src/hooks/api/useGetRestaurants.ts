import { useQuery } from '@tanstack/react-query';
import { get } from '~/libs/api';
import { Restaurants } from '~/types/restaurants';

const useGetRestaurants = () => {
	return useQuery<Restaurants>({
		queryKey: ['restaurants'],
		queryFn: () => get('/restaurants'),
	});
};

export default useGetRestaurants;
