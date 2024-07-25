import {
	Container as MapDiv,
	NaverMap,
	Marker,
	useNavermaps,
} from 'react-naver-maps';

const Map = () => {
	const navermaps = useNavermaps();

	return (
		<MapDiv
			style={{
				width: '100%',
				height: '300px',
			}}
		>
			<NaverMap
				defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
				defaultZoom={15}
			>
				<Marker
					defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)}
				/>
				{/* // 서울 시청 위도 : 37.5666612, 경도 : 126.9783785 */}
				<Marker
					defaultPosition={new navermaps.LatLng(37.5666612, 126.9783785)}
				/>
			</NaverMap>
		</MapDiv>
	);
};

export default Map;
