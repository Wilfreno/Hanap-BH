import { UserDetailType } from "@/lib/types/user-detail-type";
import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new Schema<UserDetailType>({
  given_name: {
    type: String,
    default: "",
  },
  middle_name: {
    type: String,
    default: "",
  },
  family_name: {
    type: String,
    default: "",
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
    default: undefined,
  },
  profile_pic: {
    type: String,
    default: "/img/pfp/default.png",
  },
  contact: {
    email: {
      type: String,
      required: true,
    },
    social_media: {
      facebok: {
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
        default: "",
      },
    ],
  },
  password: {
    type: String,
    default: undefined,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
