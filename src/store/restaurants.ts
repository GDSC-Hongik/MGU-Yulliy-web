import { atom } from 'jotai';
import { Restaurant } from '~/types/restaurants';

// 레스토랑 목록을 저장하는 atom
export const restaurantAtom = atom<Restaurant[]>([]);

// 검색 결과를 저장하는 atom
export const searchRestaurantAtom = atom<Restaurant[]>([]);

export const selectedRestaurantIdAtom = atom<number | null>(null);
