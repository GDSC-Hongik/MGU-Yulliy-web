import { useQuery } from '@tanstack/react-query';
import { get } from '~/libs/api';

const useGetRestaurants = () => {
	return useQuery({
		queryKey: ['restaurants'],
		queryFn: () => get('/restaurants'),
	});
};

export default useGetRestaurants;
