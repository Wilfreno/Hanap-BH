import { LocationType } from "@/lib/types/user-detail-type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: LocationType = {
  latitude: undefined,
  longitude: undefined,
};

export const user_location = createSlice({
  name: "user_location",
  initialState,
  reducers: {
    setUserLocation: (_, action: PayloadAction<LocationType>) => {
      return action.payload;
    },
  },
});

export const {setUserLocation} = user_location.actions;
export default user_location.reducer;
