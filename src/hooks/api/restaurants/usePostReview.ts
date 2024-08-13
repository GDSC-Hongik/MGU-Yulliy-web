import { useQuery } from '@tanstack/react-query';
import { post } from '~/libs/api';
import { Review } from '~/types/restaurants';

type Request = {
	content: string;
};

export const postReviewQueryKey = (request: Request) => ['review', request];

const usePostReview = (restaurantId: number, request: Request) => {
	return useQuery<Review>({
		queryKey: postReviewQueryKey(request),
		queryFn: () =>
			post<Review>(`/restaurants/${restaurantId}/reviews/`, request),
		enabled: false,
	});
};

export default usePostReview;
