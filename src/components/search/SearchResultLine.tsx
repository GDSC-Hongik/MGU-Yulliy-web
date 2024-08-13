import { useSetAtom } from 'jotai';
import { styled } from 'styled-components';
import { Divider } from '~/components/search/Divider';
import SmallStarRating from '~/components/search/SmallStarRating';
import { selectedRestaurantIdAtom } from '~/store/restaurants';
import { Restaurant } from '~/types/restaurants';

const Title = styled.h3`
	display: inline-block;
	font-size: 14px;
	font-weight: ${({ theme }) => theme.fontWeights.Regular};
	max-width: 100%;
`;

const Address = styled.div`
	flex: 1;
	font-size: 12px;
	font-weight: ${({ theme }) => theme.fontWeights.Light};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	margin-right: 8px;
`;

const FoodType = styled.p`
	display: inline-block;
	font-size: 12px;
	font-weight: ${({ theme }) => theme.fontWeights.regular};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 100%;
`;

const LineWrapper = styled.div`
	width: 100%;
	padding: 0 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	gap: 8px;
	cursor: pointer;
`;

const Info = styled.div`
	width: 100%;
	padding: 0 8px;
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	gap: 8px;
`;

const SearchResultLine: React.FC<Restaurant> = (restaurant) => {
	const setSelectedId = useSetAtom(selectedRestaurantIdAtom);

	const searchClick = () => {
		setSelectedId(restaurant.id);
	};
	return (
		<>
			<LineWrapper onClick={searchClick}>
				<Info>
					<Title>{restaurant.name}</Title>
					<Address>{restaurant.address}</Address>
				</Info>
				<Info>
					<SmallStarRating rating={restaurant.rating_average} />
					<FoodType>{restaurant.food_type || '치킨 및 닭강정'}</FoodType>
				</Info>
			</LineWrapper>
			<Divider />
		</>
	);
};

export default SearchResultLine;
