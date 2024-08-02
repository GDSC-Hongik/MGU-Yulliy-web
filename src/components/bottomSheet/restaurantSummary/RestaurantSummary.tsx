import StarRating from '~/components/bottomSheet/restaurantSummary/StarRating';
import { Restaurant } from '~/types/restaurants';

interface RestaurantSummaryProps {
	restaurant: Restaurant; // Restaurant 타입 사용
}

const RestaurantSummary: React.FC<RestaurantSummaryProps> = ({
	restaurant,
}) => {
	const calculateAverageRating = (): number => {
		const { rating_naver, rating_kakao, rating_google } = restaurant;
		const ratings = [
			parseFloat(rating_naver || '0'),
			parseFloat(rating_kakao || '0'),
			parseFloat(rating_google || '0'),
		];
		// 유효한 평점 수 계산
		const validRatings = ratings.filter((rating) => rating > 0);
		// 유효한 평점이 없으면 'No ratings available' 반환
		if (validRatings.length === 0) return 0;
		// 평균 계산
		const average =
			validRatings.reduce((acc, curr) => acc + curr, 0) / validRatings.length;
		return Number(average.toFixed(2));
	};

	return (
		<div>
			<h3>{restaurant.name}</h3>
			<StarRating rating={calculateAverageRating()} />
		</div>
	);
};

export default RestaurantSummary;
