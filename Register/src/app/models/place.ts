import { LocationType } from './location-type';

export interface Place {
 location_id: number
 address: string
 name: string
 type: LocationType;
}
