import { UserDetailType } from "@/lib/types/user-detail-type";
import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new Schema<UserDetailType>({
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
    default: undefined,
  },
  last_name: {
    type: String,
    required: true,
  },
  place_owned: [
    {
      type: Schema.Types.ObjectId,
      ref: "PlaceDetail",
      default: undefined,
    },
  ],
  gender: {
    type: String,
    default: undefined,
  },
  birth_date: {
    type: Date,
    required: true,
  },
  profile_pic: {
    type: String,
    default: "/img/pfp/default.png",
  },
  contact: {
    social_media: {
      facebok: {
        type: String,
        default: undefined,
      },
      twitter: {
        type: String,
        default: undefined,
      },
      instagram: {
        type: String,
        default: undefined,
      },
    },
    phone_number: {
      type: String,
      default: undefined,
    },
  },
  password: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
