import { PlaceDetailType } from "@/lib/types/google-place-api-types";
import mongoose, { Schema } from "mongoose";

const PlaceSchema: Schema = new Schema<PlaceDetailType>({
  owner: {
    type: Schema.Types.ObjectId,
    default: undefined,
    ref: "User",
  },
  place_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    vicinity: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      default: "",
    },
    municipality: {
      type: String,
      default: "",
    },
    barangay: {
      type: String,
      default: "",
    },
    street: {
      type: String,
      default: "",
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
  rating: {
    type: Number,
    required: true,
  },
  contact: {
    social_media: {
      facebook: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
      instagram: {
        type: String,
        default: "",
      },
    },
    phone_number: [
      {
        type: String,
        default: undefined,
      },
    ],
  },
  database: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.PlaceDetail ||
  mongoose.model("PlaceDetail", PlaceSchema);
