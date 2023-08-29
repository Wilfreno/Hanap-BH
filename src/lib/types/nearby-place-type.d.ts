import { LatLngLiteral } from "./google-map-type";

export type NearbyPlaceResponseType = {
  results: NearbyPlaceType[];
};

export type NearbyPlaceType = {
  place_id: string;
  geometry: {
    location: LatLngLiteral;
  };
  name: string;
  photos: [
    {
      height: number;
      width: number;
      photo_reference: string;
    }
  ];
  rating: number;
  vicinity: string;
};

export type NearbyPlaceAPIResponseType = {
  place_id: string;
  location: LatLngLiteral;
  description: string;
  vicnity: string;
  photo: {
    height: number;
    width: number;
    photo_reference: string;
  };
  rating: number;
};
