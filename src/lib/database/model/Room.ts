import { RoomDetailType } from "@/lib/types/room-detail-type";
import mongoose, { Schema } from "mongoose";

const roomSchema: Schema = new Schema<RoomDetailType>({
  description: {
    type: String,
    required: true,
  },
  options: {
    price: {
      type: Number,
      required: true,

    },
    occupant_count: {
      type: Number,
      required: true 
    }
  },
  photo: [
    {
      height: {
        type: Number,
        required: true
      },
      width: {
        type: Number,
        required: true
      },
      photo_reference: {
        type: Number,
        required: true
      }
    },
  ],
});

export default mongoose.models.Room || mongoose.model("Room", roomSchema);
