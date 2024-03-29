import { Lodging, Photo, Room } from "@prisma/client";
import { LatLngLiteral } from "./google-maps-api-type";
import { PhotosType } from "./photos-type";
import { UserDetailType } from "./user-detail-type";

export type NominatimReverseAPiResponse = {
  address: {
    city?: string;
    town?: string;
    country?: string;
    country_code?: string;
  };
};

export type PlacesAPIResponse = {
  next_page_token: string | null;
  results: PlacesAPIResult[];
  status: string;
};

export type PlacesAPIResult = {
  business_status: string;
  geometry: {
    location: LatLngLiteral;
  };
  photos: {
    photo_reference: string;
  }[];
  name: string;
  place_id: string;
  rating: number;
  user_ratings_total: number;
  vicinity: string;
};

export interface LodgingDetailsType extends Lodging {
  distance: number;
  database: "GOOGLE" | "MONGODB";
  photos?: Photo[]
  rooms?: Room[]
}

export type Lodging_Type = "BOARDING_HOUSE";
