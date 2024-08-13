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
	rating_average: string;
	rating_naver: string;
	rating_kakao: string;
	rating_google: string;
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
