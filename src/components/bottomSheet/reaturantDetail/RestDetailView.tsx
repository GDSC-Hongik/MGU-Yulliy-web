import { styled } from 'styled-components';
import BackButton from '~/components/bottomSheet/reaturantDetail/BackButton';
import RatingBox from '~/components/bottomSheet/reaturantDetail/RatingBox';
import Reviews from '~/components/bottomSheet/reaturantDetail/Reviews';
import RestaurantImgBox from '~/components/bottomSheet/restaurantSummary/RestaurantImgBox';
import StarRating from '~/components/bottomSheet/restaurantSummary/StarRating';
import { RestaurantDetail } from '~/types/restaurants';

interface RestaurantDetailProps {
	restaurantDetail: RestaurantDetail;
}

const RestDetailView: React.FC<RestaurantDetailProps> = ({
	restaurantDetail,
}) => {
	console.log(restaurantDetail);
	return (
		<div>
			<BackButton />
			<SummaryWrapper>
				<RestaurantImgBox imgUrl={restaurantDetail.image_url} />
				<SummaryInfo>
					<SummaryWrapper>
						<Title>{restaurantDetail.name}</Title>
						<Category>{restaurantDetail.food_type}</Category>
					</SummaryWrapper>
					<StarRating rating={restaurantDetail.rating_average} />
				</SummaryInfo>
			</SummaryWrapper>
			<Divider />
			<RatingBox {...restaurantDetail} />
			<Reviews reviews={restaurantDetail.reviews} />
		</div>
	);
};

export default RestDetailView;

const SummaryWrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 8px;
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
	font-size: 14px;
	font-weight: ${({ theme }) => theme.fontWeights.Light};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 100%;
`;

const Divider = styled.div`
	margin: 14px;
	height: 1px;
	background-color: ${({ theme }) => theme.colors.whitegray};
`;
