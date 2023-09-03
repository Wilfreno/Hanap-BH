import { PlaceDetailType } from "@/lib/types/places-detail-types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: PlaceDetailType = {
  owner: "",
  place_id: "",
  description: "",
  vicinity: "",
  location: undefined,
  photo: {
    height: undefined,
    width: undefined,
    photo_reference: "",
  },
  price: {
    max: undefined,
    min: undefined,
  },
  vacant_rooms: undefined,
  contact: {
    email: "",
    phone: undefined,
    social_media: "",
  },
};

export const selectedDetail = createSlice({
  name: "selectedDetail",
  initialState,
  reducers: {
    setSelectedDetail: (
      _,
      action: PayloadAction<PlaceDetailType>
    ): PlaceDetailType => {
      const {
        owner,
        place_id,
        description,
        vicinity,
        location,
        photo: { height, width, photo_reference },
        price: { max, min },
        vacant_rooms,
        contact: { email, phone, social_media },
        rating,
      } = action.payload;

      return {
        owner,
        place_id,
        description,
        vicinity,
        location,
        photo: {
          height,
          width,
          photo_reference,
        },
        price: {
          max,
          min,
        },
        vacant_rooms,
        contact: {
          email,
          phone,
          social_media,
        },
        rating,
      };
    },
  },
});

export const { setSelectedDetail } = selectedDetail.actions;
export default selectedDetail.reducer;
