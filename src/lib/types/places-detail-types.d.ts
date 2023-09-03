import mongoose from "mongoose";
import { LatLngLiteral } from "./google-map-type";

export type PlaceDetailType = {
  owner?: mongoose.SchemaType.ObjectId;
  place_id: string;
  description?: string;
  vicinity: string;
  location?: LatLngLiteral;
  photo: {
    height?: number;
    width?: number;
    photo_reference: string;
  };

  price: {
    max?: number;
    min?: number;
  };
  vacant_rooms?: number;
  contact: {
    email: string;
    phone?: number;
    social_media?: string;
  };

  rating?: number;
};
