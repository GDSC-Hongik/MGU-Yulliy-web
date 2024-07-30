import styled from 'styled-components';
import Map from '../components/Map';
import SearchBar from '~/components/map/SearchBar';

const HomePage = () => {
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
