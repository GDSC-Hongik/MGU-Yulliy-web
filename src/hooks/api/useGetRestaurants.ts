import { useQuery } from '@tanstack/react-query';
import { get } from '~/libs/api';
import { UserRestaurant } from '~/types/restaurants';

type Response = UserRestaurant[];

const useGetRestaurants = () => {
	return useQuery<Response>({
		queryKey: ['restaurants'],
		queryFn: () => get('/restaurants'),
	});
};

export default useGetRestaurants;
