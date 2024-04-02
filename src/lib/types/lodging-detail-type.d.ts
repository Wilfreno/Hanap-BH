import { Lodging, Photo, Rating, Room } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export interface LodgingDetailsType extends Lodging {
  distance: number;
  database: "GOOGLE" | "POSTGERSQL";
  photos?: Photo[];
  rooms?: Room[];
  ratings: Rating[];
}

export type Lodging_Type = "BOARDING_HOUSE";

export type LodgingSearchType = {
  search_value: string;
  lodging_type: string;
  location: PhilippinesPlaces;
  longitude: number | Decimal;
  latitude: number | Decimal;
};
