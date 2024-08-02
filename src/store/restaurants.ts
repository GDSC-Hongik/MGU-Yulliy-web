import { atom } from 'jotai';
import { UserRestaurant } from '~/types/restaurants';

// UserRestaurant 타입의 배열을 저장할 atom
export const restaurantAtom = atom<UserRestaurant[]>([]);
