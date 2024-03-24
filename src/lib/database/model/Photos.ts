import mongoose, { Schema } from "mongoose";

const PhotoSchema: Schema = new Schema({
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
