import { useAtom } from 'jotai';
import CustomMarker from './map/CustomMarker';
import { Container as MapDiv, NaverMap, useNavermaps } from 'react-naver-maps';
import { restaurantAtom } from '~/store/restaurants';
import { startTransition, useEffect, useState } from 'react';
import Loading from '~/components/common/Loading';
import UserLocation from '~/components/map/UserLocation';
import { geoLocationAtom } from '~/store/geoLocates';

type MapProps = {
	onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Map: React.FC<MapProps> = ({ onClick }) => {
	const navermaps = useNavermaps();
	const [restaurants] = useAtom(restaurantAtom);
	const [geolocation] = useAtom(geoLocationAtom);
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
				defaultCenter={
					new navermaps.LatLng(geolocation.latitude, geolocation.longitude)
				}
				defaultZoom={15}
			>
				<UserLocation navermaps={navermaps} />
				{restaurants != null &&
					restaurants.map((restaurant, index) => (
						<CustomMarker
							key={index}
							navermaps={navermaps}
							lat={restaurant.latitude}
							lng={restaurant.longitude}
						/>
					))}
			</NaverMap>
		</MapDiv>
	);
};

export default Map;
