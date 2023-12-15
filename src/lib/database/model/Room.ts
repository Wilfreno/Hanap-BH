import { RoomDetailType } from "@/lib/types/google-place-api/room-types";
import mongoose, { Schema } from "mongoose";

const roomSchema: Schema = new Schema<RoomDetailType>({
  description: {
    type: String,
    required: true,
  },
  specifics: {
    benifits: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    occupant_count: {
      type: Number,
      required: true,
    },
  },
  photos: [
    {
      type: Number,
      required: true,
    },
  ],
});

export default mongoose.models.Room || mongoose.model("Room", roomSchema);
