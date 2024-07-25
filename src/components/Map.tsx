import { useEffect, useRef } from 'react';

const Map = () => {
	const mapRef = useRef(null);
	const lat = 37.3595704; // 위도 숫자로 넣어주기
	const lng = 127.105399; // 경도 숫자로 넣어주기

	useEffect(() => {
		const { naver } = window;
		if (mapRef.current && naver) {
			const location = new naver.maps.LatLng(lat, lng);
			const map = new naver.maps.Map(mapRef.current, {
				center: location,
				zoom: 17,
			});

			// 테스트 삼아서 서울 시청을 마크찍어보기
			// 서울 시청 위도 : 37.5666612, 경도 : 126.9783785
			const cityHallLocation = new naver.maps.LatLng(37.5666612, 126.9783785);
			const markerOptions = {
				position: cityHallLocation,
				map: map,
				icon: './pin.png',
			};
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const marker = new naver.maps.Marker(markerOptions);

			new naver.maps.Marker({
				position: location,
				map,
			});
		}
	}, []);

	return <div ref={mapRef} style={{ width: '300px', height: '300px' }}></div>;
};

export default Map;
