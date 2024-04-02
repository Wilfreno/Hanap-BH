import { LatLngLiteral } from "./google-maps-api-type";

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

