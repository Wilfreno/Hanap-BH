import { PhotosType } from "@/lib/types/google-place-api-types";
import mongoose, { Schema } from "mongoose";

const PhotoSchema: Schema = new Schema<PhotosType>({
  reference: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  photo_url: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Photo || mongoose.model("Photo", PhotoSchema);
