import { Lodging, Photo, Rating, Room } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export interface LodgingDetailsType
  extends Omit<Lodging, "latitude" | "longitude"> {
  distance: number;
  latitude: number;
  longitude: number;
  photos?: Photo[];
  rooms?: Room[];
  ratings?: RatingDetailsType[];
  database: "GOOGLE" | "POSTGERSQL";
}

export interface RatingDetailsType extends Omit<Rating, "value"> {
  value: number;
}

export type LodgingType =
  | "BOARDING_HOUSE"
  | "APARTMENT"
  | "HOTEL"
  | "MOTEL"
  | "B&B";

export type LodgingSearchType = {
  search_value: string;
  lodging_type: string;
  location: PhilippinesPlaces;
  longitude: number | Decimal;
  latitude: number | Decimal;
};
