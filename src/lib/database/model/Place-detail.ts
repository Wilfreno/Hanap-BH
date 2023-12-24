import mongoose, { Schema } from "mongoose";

const PlaceSchema: Schema = new Schema({
  owner: {
    type: String,
    required: true,
  },
  place_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  photos: [
    {
      type: String,
      required: true,
    },
  ],
  specifics: {
    gender_restriction: {
      type: String,
      required: true,
    },
    benefits: [
      {
        type: String,
        required: true,
      },
    ],
    desctiption: {
      type: String,
      default: "",
    },
  },
  rooms: [
    {
      type: String,
      default: "",
    },
  ],
  location: {
    vicinity: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      default: "",
    },
    town: {
      city: {
        type: String,
        default: "",
      },
      municipality: {
        type: String,
        default: "",
      },
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
    count: {
      type: Number,
      default: 0,
    },
    average: {
      type: Number,
      default: 0,
    },
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
  date_created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.PlaceDetail ||
  mongoose.model("PlaceDetail", PlaceSchema);
