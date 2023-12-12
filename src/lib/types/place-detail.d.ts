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
export type PlacesAPIResponseDetails = {
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

export type PlaceDetailsType = {
  owner: string;
  place_id: string;
  name: string;
  photos: string[];
  location: {
    vicinity: string;
    province: string;
    town: {
      city?: string;
      municipality?: string;
    };
    barangay: string;
    street: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  price: {
    max?: number;
    min?: number;
  };
  rating: {
    count: number;
    average: number;
  };
  rooms: number;
  distance: number;
  database: string;
  date_created?: Date;
};
