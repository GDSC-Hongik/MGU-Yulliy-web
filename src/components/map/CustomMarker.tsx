import { Marker } from 'react-naver-maps';
import pinImage from '~/assets/images/pin.svg';

type CustomMarkerProps = {
	navermaps: typeof naver.maps;
	lat: number;
	lng: number;
};

const CustomMarker: React.FC<CustomMarkerProps> = ({ navermaps, lat, lng }) => {
	return (
		<Marker
			position={new navermaps.LatLng(lat, lng)}
			icon={{ url: pinImage }}
		/>
	);
};

export default CustomMarker;
