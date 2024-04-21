import { Location, Lodging, Photo, Prisma, Rating, Room } from "@prisma/client";


export interface LodgingDetailsType
  extends Lodging {
  distance: number;
  photos?: Photo[]
  location: LodgingLocationType;
  ratings?: LodgingRating[];
  database: "GOOGLE" | "POSTGERSQL";
}

export interface LodgingLocationType
  extends Omit<Location, "longitude" | "latitude"> {
  latitude: number;
  longitude: number;
}

export interface LodgingRating extends Omit<Rating, "value"> {
  value: number;
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
