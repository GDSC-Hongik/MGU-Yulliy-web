import styled from 'styled-components';
import Map from '../components/Map';
import SearchBar from '~/components/map/SearchBar';
// 임시로 만들어본 폰트 테스트 페이지입니다.
import { useEffect } from 'react';
import axios from '../libs/axios';
import { useNavigate } from 'react-router-dom';
interface TestDivProps {
	fontWeight: 'regular' | 'bold' | 'extraBold' | 'light';
}

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
	}, []);
	return (
		<Container>
			<SearchBar />
			<MapWrapper>
				<Map />
			</MapWrapper>
		</Container>
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
