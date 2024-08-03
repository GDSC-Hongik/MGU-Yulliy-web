import { styled } from 'styled-components';
import MoreButton from '~/components/bottomSheet/restaurantSummary/MoreButton';
import RestaurantImgBox from '~/components/bottomSheet/restaurantSummary/RestaurantImgBox';
import StarRating from '~/components/bottomSheet/restaurantSummary/StarRating';
import { Restaurant } from '~/types/restaurants';

interface RestaurantSummaryProps {
	restaurant: Restaurant; // Restaurant 타입 사용
}

const SummaryWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 8px;
`;

const SummaryInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
	max-width: calc(100% - 16px - 16px - 50px - 68px);
`;

const Title = styled.h3`
	display: inline-block;
	font-size: 16px;
	font-weight: ${({ theme }) => theme.fontWeights.Regular};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 100%;
`;

const Category = styled.p`
	display: inline-block;
	margin-top: 6px;
	font-size: 12px;
	font-weight: ${({ theme }) => theme.fontWeights.Light};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 100%;
`;

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
		<SummaryWrapper>
			<RestaurantImgBox />
			<SummaryInfo>
				<Title>{restaurant.name}</Title>
				{/* TODO: address가 아니라 카테고리로 변경 */}
				<Category>{restaurant.address}</Category>
				<StarRating rating={calculateAverageRating()} />
			</SummaryInfo>
			<MoreButton />
		</SummaryWrapper>
	);
};

export default RestaurantSummary;
