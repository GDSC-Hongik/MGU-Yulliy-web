export interface Restaurant {
	id: number;
	name: string;
	rating_naver: string | null;
	rating_kakao: string | null;
	rating_google: string | null;
	address: string;
	latitude: number;
	longitude: number;
}

// User와 연결된 Restaurant 정보를 나타내는 타입
export interface UserRestaurant {
	id: number;
	restaurant: Restaurant;
	user: number;
}
