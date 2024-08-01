import CustomMarker from './map/CustomMarker';
import { Container as MapDiv, NaverMap, useNavermaps } from 'react-naver-maps';

type MapProps = {
	onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const latLngData = [
	{
		lat: 37.3595704,
		lng: 127.105399,
	},
	{
		lat: 37.5666612,
		lng: 126.9783785,
	},
];

const Map: React.FC<MapProps> = ({ onClick }) => {
	const navermaps = useNavermaps();

	return (
		<MapDiv
			style={{
				width: '100%',
				height: '100%',
			}}
			onClick={onClick}
		>
			<NaverMap
				defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
				defaultZoom={15}
			>
				{latLngData.map((data, index) => (
					<CustomMarker
						key={index}
						navermaps={navermaps}
						lat={data.lat}
						lng={data.lng}
					/>
				))}
			</NaverMap>
		</MapDiv>
	);
};

export default Map;
