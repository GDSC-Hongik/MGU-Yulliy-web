import { styled } from 'styled-components';
import MoreButton from '~/components/bottomSheet/restaurantSummary/MoreButton';
import RestaurantImgBox from '~/components/bottomSheet/restaurantSummary/RestaurantImgBox';
import StarRating from '~/components/bottomSheet/restaurantSummary/StarRating';
import { Restaurant } from '~/types/restaurants';

interface RestaurantSummaryProps {
	restaurant: Restaurant;
	moreButtonClick: () => void;
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
	moreButtonClick,
}) => {
	console.log(restaurant);
	return (
		<SummaryWrapper>
			<RestaurantImgBox imgUrl={restaurant.image_url} />
			<SummaryInfo>
				<Title>{restaurant.name}</Title>
				<Category>{restaurant.food_type}</Category>
				<StarRating rating={restaurant.rating_average} />
			</SummaryInfo>
			<MoreButton moreButtonClick={moreButtonClick} />
		</SummaryWrapper>
	);
};

export default RestaurantSummary;
