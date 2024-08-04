import { atom } from 'jotai';
import { Restaurant, UserRestaurant } from '~/types/restaurants';

// UserRestaurant 타입의 배열을 저장할 atom
export const restaurantAtom = atom<UserRestaurant[]>([]);

// TODO 임시 데이터 (나중에 삭제해야함)
export type tempRestaurant = {
	results: Restaurant[];
};

// TODO 임시 데이터 (나중에 삭제해야함)
export const tempRestaurantAtom = atom<tempRestaurant>({ results: [] });
