import styled from 'styled-components';
import Map from '../components/Map';
import SearchBar from '~/components/map/SearchBar';
import { useEffect, useState } from 'react';
import axios from '../libs/axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '~/components/navBar/NavBar';
import BottomSheet from '~/components/bottomSheet/BottomSheet';
import useGetRestaurants from '~/hooks/api/useGetRestaurants';
import { useSetAtom } from 'jotai';
import { restaurantAtom } from '~/store/restaurants';
import Head from '~/components/common/Head';

const HomePage = () => {
	const navigate = useNavigate();
	const setRestaurants = useSetAtom(restaurantAtom);
	const { data } = useGetRestaurants();

	const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
	useEffect(() => {
		if (data) {
			setRestaurants(data);
		}
	}, [data, setRestaurants]);

	useEffect(() => {
		async function checkUser() {
			try {
				const res = await axios.get('/users/me');
				if (res.data) {
					navigate('/');
				}
			} catch (error) {
				navigate('/login');
			}
		}
		checkUser();
	}, [navigate]);

	const handleMapClick = () => {
		setIsBottomSheetVisible(true);
	};

	const handleCloseBottomSheet = () => {
		setIsBottomSheetVisible(false);
	};

	return (
		<>
			<Head title="비밀 지도" />
			<Container>
				<SearchBar bottomSheetClose={handleCloseBottomSheet} />
				<MapWrapper>
					<Map onClick={handleMapClick} />
				</MapWrapper>
			</Container>
			{isBottomSheetVisible && <BottomSheet onClose={handleCloseBottomSheet} />}
			{!isBottomSheetVisible && <NavBar />}
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
