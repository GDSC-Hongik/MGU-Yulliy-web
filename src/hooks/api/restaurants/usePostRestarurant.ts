import { useQuery } from '@tanstack/react-query';
import { post } from '~/libs/api';

export const postRestaurantQueryKey = (restaurantId: number) => [
	'restaurants',
	restaurantId,
];

const usePostRestaurant = (restaurantId: number) => {
	return useQuery({
		queryKey: postRestaurantQueryKey(restaurantId),
		queryFn: () => post(`/restaurants/${restaurantId}/`),
		enabled: false,
	});
};

export default usePostRestaurant;
