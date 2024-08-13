import styled from 'styled-components';
import Map from '../components/Map';
import SearchBar from '~/components/map/SearchBar';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '~/components/navBar/NavBar';
import BottomSheet from '~/components/bottomSheet/BottomSheet';
import useGetRestaurants from '~/hooks/api/useGetRestaurants';
import { useAtom, useSetAtom } from 'jotai';
import { restaurantAtom, selectedRestaurantId } from '~/store/restaurants';
import Head from '~/components/common/Head';

const HomePage = () => {
	const location = useLocation();
	const setRestaurants = useSetAtom(restaurantAtom);
	const [selectedId] = useAtom(selectedRestaurantId);
	const { data } = useGetRestaurants();

	const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
	const [isSearchVisible, setSearchVisible] = useState<boolean>(
		location.pathname === '/search',
	);

	useEffect(() => {
		if (selectedId !== null) {
			setIsBottomSheetVisible(true);
			setSearchVisible(false);
			window.history.pushState(null, '', '/');
		}
	}, [selectedId]);

	useEffect(() => {
		if (data) {
			setRestaurants(data);
		}
	}, [data, setRestaurants]);

	const handleMapClick = () => {
		setIsBottomSheetVisible(true);
	};

	const handleCloseBottomSheet = () => {
		setIsBottomSheetVisible(false);
	};

	const handleSearchVisible = (visible: boolean) => {
		console.log('호출!', visible);
		setSearchVisible(visible);
	};

	return (
		<>
			<Head title="비밀 지도" />
			<Container>
				<SearchBar
					bottomSheetClose={handleCloseBottomSheet}
					isSearchVisible={isSearchVisible}
					handleSearchVisible={handleSearchVisible}
				/>
				<MapWrapper>
					<Map onClick={handleMapClick} />
				</MapWrapper>
			</Container>
			{isBottomSheetVisible && <BottomSheet onClose={handleCloseBottomSheet} />}
			{!isBottomSheetVisible && (
				<NavBar handleSearchVisible={() => handleSearchVisible(false)} />
			)}
		</>
	);
};

export default HomePage;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const MapWrapper = styled.div`
	width: 100%;
	height: calc(100vh - 56px); /* 전체 화면에서 56px을 뺀 높이 */
`;
