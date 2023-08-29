import { PlaceDetailType } from "@/lib/types/places-detail-types";
import mongoose, { Schema } from "mongoose";

const PlacesSchema: Schema = new Schema<PlaceDetailType>({
  owner: {
    type: Schema.ObjectId,
    default: undefined,
  },
  place_id: {
    type: String,
    required: true,
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
});

export default mongoose.models.PlaceDetail ||
  mongoose.model("PlaceDetail", PlacesSchema);
