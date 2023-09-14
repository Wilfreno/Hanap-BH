import { Schema } from "mongoose";
import { LatLngLiteral } from "./google-maps-api-type";
import { UserDetailType } from "./user-detail-type";

export type NearbyPlaceType = {
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
  place_id: string;
  rating: number;
  vicinity: string;
};

export type PlaceDetailType = {
  owner?: UserDetailType;
  place_id: string;
  name: string;
  location: {
    vicinity: string;
    province: string;
    municipality: string;
    barangay: string;
    street: string;
    coordinates: LatLngLiteral;
  };
  price: {
    max?: number;
    min?: number;
  };
  rooms?: number;
  rating: number;
  contact: {
    social_media: {
      facebook: string;
      twitter: string;
      instagram: string;
    };
    phone_number: string[];
  };
  database?: string;
  date_created?: Date;
};

export type RoomDetailType = {
  description: string;
  options: {
    price: number;
    occupant_count: number;
  }[];
  photo: PhotosType[];
};

export type PhotosType = {
  reference?: Schema.Types.ObjectId;
  height?: number;
  width?: number;
  photo_url: string;
};
