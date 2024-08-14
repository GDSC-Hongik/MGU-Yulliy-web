import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import CustomMarker from './map/CustomMarker';
import { Container as MapDiv, NaverMap, useNavermaps } from 'react-naver-maps';
import { restaurantAtom } from '~/store/restaurants';
import { startTransition, useEffect, useState } from 'react';
import Loading from '~/components/common/Loading';
import UserLocation from '~/components/map/UserLocation';
import { geoLocationAtom, mapAtom, mapCenterAtom } from '~/store/geoLocates';

type MapProps = {
	onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Map: React.FC<MapProps> = ({ onClick }) => {
	const navermaps = useNavermaps();
	const setMap = useSetAtom(mapAtom);
	const [restaurants] = useAtom(restaurantAtom);
	const [geolocation] = useAtom(geoLocationAtom);
	const [isMapLoaded, setIsMapLoaded] = useState(false);
	const mapCenter = useAtomValue(mapCenterAtom);
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
				ref={setMap}
			>
				<UserLocation navermaps={navermaps} />
				{restaurants != null &&
					restaurants.map((restaurant, index) => (
						<CustomMarker
							key={index}
							navermaps={navermaps}
							lat={restaurant.latitude}
							lng={restaurant.longitude}
							isCenter={false}
						/>
					))}
				{mapCenter && (
					<CustomMarker
						navermaps={navermaps}
						lat={mapCenter.latitude}
						lng={mapCenter.longitude}
						isCenter={true}
					/>
				)}
			</NaverMap>
		</MapDiv>
	);
};

export default Map;
