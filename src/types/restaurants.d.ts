import { Restaurant } from '~/types/restaurants';

export interface GeoLocation {
	latitude: number;
	longitude: number;
}

export interface Restaurant extends GeoLocation {
	id: number;
	name: string;
	food_type: string | null;
	rating_average: number | null;
	rating_naver: number | null;
	rating_kakao: number | null;
	rating_google: number | null;
	address: string;
}

export type Restaurants = Reaurant[];
