import { Marker } from 'react-naver-maps';
import Loading from '~/components/common/Loading';
import ProfileImg from '~/assets/images/Profile.png';
import { useAtom } from 'jotai';
import { geoLocationAtom, geoLocationErrorAtom } from '~/store/geoLocates';
import useGeoLocation from '~/hooks/useGeoLocation';

interface UserLocationProps {
	navermaps: typeof naver.maps;
}

const UserLocation: React.FC<UserLocationProps> = ({ navermaps }) => {
	const [location] = useAtom(geoLocationAtom);
	const [error] = useAtom(geoLocationErrorAtom);

	useGeoLocation();

	return (
		<>
			{error ? (
				<Marker
					position={new navermaps.LatLng(37.55043854, 126.9203867)}
					icon={{ url: ProfileImg }}
				/>
			) : (
				<>
					{location ? (
						<Marker
							position={
								new navermaps.LatLng(location.latitude, location.longitude)
							}
							icon={{
								content: ProfileMarker(),
							}}
						/>
					) : (
						<Loading />
					)}
				</>
			)}
		</>
	);
};

export default UserLocation;

const ProfileMarker = () => {
	const div = document.createElement('div');
	div.style.backgroundImage = `url(${ProfileImg})`;
	div.style.width = '30px';
	div.style.height = '30px';
	div.style.backgroundSize = 'cover';
	div.style.backgroundPosition = 'center';
	div.style.borderRadius = '50%';
	div.style.outline = '1px solid gray';
	return div;
};
