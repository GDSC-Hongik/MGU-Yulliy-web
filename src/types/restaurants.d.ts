export interface Restaurant {
	id: number;
	name: string;
	food_type: string | null;
	rating_average: number | null;
	rating_naver: number | null;
	rating_kakao: number | null;
	rating_google: number | null;
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
