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
