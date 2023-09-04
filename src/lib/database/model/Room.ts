import { RoomDetailType } from "@/lib/types/room-detail-type";
import mongoose, { Schema } from "mongoose";

const roomSchema: Schema = new Schema<RoomDetailType>({
  description: {
    type: String,
    required: true,
  },
  vacancy: {
    type: Number,
    required: true,
  },
  photo: [
    {
      type: String,
      required: true,
    },
  ],
  price: {
    max: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
  },
});

export default mongoose.models.Room || mongoose.model("Room", roomSchema);
