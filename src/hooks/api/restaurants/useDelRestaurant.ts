import { useQuery } from '@tanstack/react-query';
import { del } from '~/libs/api';

export const delRestaurantQueryKey = (restaurantId: number) => [
	'restaurants',
	restaurantId,
];

const useDelRestaurant = (restaurantId: number) => {
	return useQuery({
		queryKey: delRestaurantQueryKey(restaurantId),
		queryFn: () => del(`/restaurants/${restaurantId}/`),
		enabled: false,
	});
};

export default useDelRestaurant;
