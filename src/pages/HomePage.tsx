import styled from 'styled-components';
import Map from '../components/Map';
import SearchBar from '~/components/map/SearchBar';
import { useEffect } from 'react';
import axios from '../libs/axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '~/components/navBar/NavBar';

const HomePage = () => {
	const navigate = useNavigate();
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
	return (
		<>
			<Container>
				<SearchBar />
				<MapWrapper>
					<Map />
				</MapWrapper>
			</Container>
			<NavBar />
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
