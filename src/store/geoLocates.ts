import { atom } from 'jotai';
import { GeoLocation } from '~/types/restaurants';

export const geoLocationAtom = atom<GeoLocation>({
	latitude: 37.55043854,
	longitude: 126.9203867,
});
export const geoLocationErrorAtom = atom<string | null>(null);
