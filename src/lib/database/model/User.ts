import { UserDetailType } from "@/lib/types/user-detail-type";
import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new Schema({
  first_name: {
    type: String,
    default: "",
  },
  middle_name: {
    type: String,
    default: "",
  },
  last_name: {
    type: String,
    default: "",
  },
  place_owned: [
    {
      type: String,
      default: "",
    },
  ],
  gender: {
    type: String,
    default: undefined,
  },
  birthday: {
    year: {
      type: Number,
      default: "",
    },
    month: {
      type: String,
      default: "",
    },
    day: {
      type: Number,
      default: "",
    },
  },
  profile_pic: {
    type: String,
    default: "/img/pfp/default.png",
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
        default: "",
      },
    ],
  },
  auth: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
