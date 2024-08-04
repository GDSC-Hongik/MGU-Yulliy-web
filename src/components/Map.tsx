import { useAtom } from 'jotai';
import CustomMarker from './map/CustomMarker';
import { Container as MapDiv, NaverMap, useNavermaps } from 'react-naver-maps';
import { restaurantAtom } from '~/store/restaurants';
import { startTransition, useEffect, useState } from 'react';
import Loading from '~/components/common/Loading';

type MapProps = {
	onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Map: React.FC<MapProps> = ({ onClick }) => {
	const navermaps = useNavermaps();
	const [restaurants] = useAtom(restaurantAtom);
	const [isMapLoaded, setIsMapLoaded] = useState(false);

	useEffect(() => {
		startTransition(() => {
			if (navermaps) {
				setIsMapLoaded(true);
			}
		});
	}, [navermaps]);

	if (!isMapLoaded) {
		return <Loading />;
	}

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
				{restaurants.map((restaurantData, index) => (
					<CustomMarker
						key={index}
						navermaps={navermaps}
						lat={restaurantData.restaurant.latitude}
						lng={restaurantData.restaurant.longitude}
					/>
				))}
			</NaverMap>
		</MapDiv>
	);
};

export default Map;
