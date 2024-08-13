import { useQuery } from '@tanstack/react-query';
import { get } from '~/libs/api';
import { RestaurantDetail } from '~/types/restaurants';

const useGetDetailRestaurants = (id: number) => {
	return useQuery<RestaurantDetail>({
		queryKey: ['restaurants', id],
		queryFn: () => get(`/restaurants/${id}/detail`),
		enabled: !!id,
	});
};

export default useGetDetailRestaurants;
