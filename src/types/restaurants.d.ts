import { Restaurant } from '~/types/restaurants';

export interface GeoLocation {
	latitude: number;
	longitude: number;
}

export interface Restaurant extends GeoLocation {
	address: string;
	food_type: string | null;
	id: number;
	image_url: string;

	name: string;
	rating_average: number | null;
	rating_naver: number | null;
	rating_kakao: number | null;
	rating_google: number | null;
}

export type Restaurants = Reaurant[];

export interface Review {
	content: string;
	date: string;
	decommend_count: number;
	id: number;
	recommend_count: number;
	replies_count: number;
	user_name: string;
}

export interface RestaurantDetail extends Restaurant {
	reviews: Review[];
}
