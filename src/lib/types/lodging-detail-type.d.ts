import { Location, Lodging, Photo, Rating, Room } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export interface LodgingDetailsType
  extends Omit<Lodging, "latitude" | "longitude"> {
  distance: number;
  photos?: Photo[];
  rooms?: Room[];
  location: LodgingLocationType;
  ratings?: RatingDetailsType[];
  database: "GOOGLE" | "POSTGERSQL";
}

export interface LodgingLocationType
  extends Omit<Location, "longitude" | "latitude"> {
  latitude: number;
  longitude: number;
}
export interface RatingDetailsType extends Omit<Rating, "value"> {
  value: number;
}

export type LodgingType =
  | "BOARDING_HOUSE"
  | "APARTMENT"
  | "HOTEL"
  | "MOTEL"
  | "B&B"
  | string;

export type LodgingSearchType = {
  search_value: string;
  lodging_type: string;
  location: PhilippinesPlaces;
  longitude: number | Decimal;
  latitude: number | Decimal;
};
