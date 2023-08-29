import mongoose from "mongoose";
import { LatLngLiteral } from "./google-map-type";

export type PlaceDetailType = {
  owner?: mongoose.SchemaType.ObjectId;
  place_id: string;
  description?: string;
  secondary_text: string;

  photo: {
    height: number;
    width: number;
    photo_reference: string;
  };

  price?: {
    max: number;
    min: number;
  };
  slots?: number;
  contact?: {
    email: string;
    phone: number;
    social: string;
  };

  rating?: number;
};
