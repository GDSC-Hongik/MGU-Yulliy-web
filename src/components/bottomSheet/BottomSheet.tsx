import { useAtom } from 'jotai';
import { useEffect } from 'react';
import styled from 'styled-components';
import RestDetailView from '~/components/bottomSheet/reaturantDetail/RestDetailView';
import RestaurantSummary from '~/components/bottomSheet/restaurantSummary/RestaurantSummary';
import useGetDetailRestaurants from '~/hooks/api/restaurants/useGetDetailRestaurants';
import useDraggable from '~/hooks/useDraggable';
import { restaurantAtom, selectedRestaurantIdAtom } from '~/store/restaurants';

type BottomSheetProps = {
	onClose: () => void;
};

const BottomSheet: React.FC<BottomSheetProps> = ({ onClose }) => {
	const { translateY, handleMouseDown } = useDraggable(onClose);
	const [restaurants] = useAtom(restaurantAtom);
	const [selectedId, setSelectedId] = useAtom(selectedRestaurantIdAtom);
	const {
		data: restaurantDetail,
		isLoading,
		isError,
		refetch,
	} = useGetDetailRestaurants(selectedId || 0);
	const moreButtonClick = (id: number) => {
		setSelectedId(id);
	};

	useEffect(() => {
		refetch();
	}, [refetch, restaurantDetail]);

	return (
		<BottomSheetWrapper $translateY={translateY}>
			<Handle onMouseDown={handleMouseDown} />
			<BottomSheetContent>
				{selectedId ? (
					<>
						{isLoading && <p>Loading...</p>}
						{isError && <p>Error fetching data</p>}
						{restaurantDetail && (
							<RestDetailView
								restaurantDetail={restaurantDetail}
								refetch={refetch}
							/>
						)}
					</>
				) : (
					<>
						{restaurants?.length > 0 ? (
							<ul>
								{restaurants.map((restaurant) => (
									<RestaurantSummary
										key={restaurant.id}
										restaurant={restaurant}
										moreButtonClick={() => moreButtonClick(restaurant.id)}
									/>
								))}
							</ul>
						) : (
							<EmptyMessage>
								검색을 통해 맛집 리스트를 추가해보세요!
							</EmptyMessage>
						)}
					</>
				)}
			</BottomSheetContent>
		</BottomSheetWrapper>
	);
};

export default BottomSheet;

const BottomSheetWrapper = styled.div<{ $translateY: number }>`
	position: fixed;
	bottom: 0;
	z-index: 100;
	width: 400px;
	background-color: ${({ theme }) => theme.colors.white};
	filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.2));

	border-top-left-radius: 16px;
	border-top-right-radius: 16px;

	max-height: 80vh;

	overflow-y: auto;
	transform: translateY(${({ $translateY }) => $translateY}px);
`;

const Handle = styled.div`
	width: 50px;
	height: 5px;
	background-color: ${({ theme }) => theme.colors.gray};
	border-radius: 5px;
	margin: 10px auto;
	cursor: grab;
`;

const BottomSheetContent = styled.div`
	padding: 16px;
	// TODO: 임시 크기
	height: 1000px;
`;

const EmptyMessage = styled.p`
	text-align: center;
	margin-top: 100px;
	font-size: 20px;
	color: ${({ theme }) => theme.colors.gray};
`;
