import { PlaceDetailType } from "@/lib/types/places-detail-types";
import mongoose, { Schema } from "mongoose";

const PlacesSchema: Schema = new Schema<PlaceDetailType>({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: undefined,
  },
  place_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  vicinity: {
    type: String,
    required: true,
  },
  location: {
    province: {
      type: String,
      default: undefined,
    },
    municipality: {
      type: String,
      default: undefined,
    },
    barangay: {
      type: String,
      default: undefined,
    },
    street: {
      type: String,
      default: undefined,
    },
    coordinates: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
  },
  photo: {
    height: {
      type: Number,
      default: undefined,
    },
    width: {
      type: Number,
      default: undefined,
    },
    photo_reference: {
      type: String,
      default: undefined,
    },
  },
  price: {
    max: {
      type: Number,
      default: undefined,
    },
    min: {
      type: Number,
      default: undefined,
    },
  },
  vacant_rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room",
      default: undefined,
    },
  ],
  rating: {
    type: Number,
    default: undefined,
  },
});

export default mongoose.models.PlaceDetail ||
  mongoose.model("PlaceDetail", PlacesSchema);
