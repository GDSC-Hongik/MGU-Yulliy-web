import { Marker } from 'react-naver-maps';
import pinImage from '~/assets/images/pin.svg';
import greenPinImage from '~/assets/images/greenPin.svg';

type CustomMarkerProps = {
	navermaps: typeof naver.maps;
	lat: number;
	lng: number;
	isCenter: boolean;
};

const CustomMarker: React.FC<CustomMarkerProps> = ({
	navermaps,
	lat,
	lng,
	isCenter,
}) => {
	return (
		<Marker
			position={new navermaps.LatLng(lat, lng)}
			icon={{ url: isCenter ? greenPinImage : pinImage }}
		/>
	);
};

export default CustomMarker;
