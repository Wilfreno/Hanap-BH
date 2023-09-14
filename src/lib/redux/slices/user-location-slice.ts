import { UserLocationType } from "@/lib/types/redux-slice-types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: UserLocationType = {
  coordinates: {
    lat: undefined,
    lng: undefined,
  },
};

export const userLocation = createSlice({
  name: "Userlocation",
  initialState,
  reducers: {
    setLocation: (_, action: PayloadAction<UserLocationType>) => {
      return action.payload;
    },
  },
});

export const { setLocation } = userLocation.actions;
export default userLocation.reducer;
