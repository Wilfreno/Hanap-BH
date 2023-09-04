import mongoose from "mongoose";
import { LatLngLiteral } from "./google-map-type";

export type PlaceDetailType = {
  owner?: mongoose.SchemaType.ObjectId;
  place_id: string;
  name: string;
  vicinity: string;
  location?: {
    province?: string;
    municipality?: string;
    barangay?: string;
    street?: string;
    coordinates: LatLngLiteral;
  };
  photo: {
    height?: number;
    width?: number;
    photo_reference: string;
  };

  price: {
    max?: number;
    min?: number;
  };
  vacant_rooms?: Schema.Types.ObjectId[];
  rating?: number;
};
