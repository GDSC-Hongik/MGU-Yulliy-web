import { useEffect, useState } from 'react';
import { GeoLocation } from '~/types/restaurants';

const useGeoLocation = () => {
	const [location, setLocation] = useState<GeoLocation | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!navigator.geolocation) {
			setError('이 브라우저에서는 위치 서비스를 지원하지 않습니다.');
			return;
		}

		const handleSuccess = (position: GeolocationPosition) => {
			const { latitude, longitude } = position.coords;
			setLocation({ latitude, longitude });
		};

		const handleError = (error: GeolocationPositionError) => {
			switch (error.code) {
				case error.PERMISSION_DENIED:
					setError('위치 접근 권한이 거부되었습니다.');
					break;
				case error.POSITION_UNAVAILABLE:
					setError('위치 정보를 사용할 수 없습니다.');
					break;
				case error.TIMEOUT:
					setError('위치 요청 시간이 초과되었습니다.');
					break;
				default:
					setError('위치 정보를 가져오는 중에 오류가 발생했습니다.');
					break;
			}
		};

		const geoOptions = {
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 0,
		};

		navigator.geolocation.getCurrentPosition(
			handleSuccess,
			handleError,
			geoOptions,
		);
	}, []);

	return { location, error };
};

export default useGeoLocation;
