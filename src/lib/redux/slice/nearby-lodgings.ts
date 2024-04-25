import { APIStatusResponseType } from "@/lib/types/api-request-response";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type T = {
  data: LodgingDetailsType[];
  status: APIStatusResponseType | "";
  next_page_token: string
};
const initialState: T = {
  data: [],
  status: "",
  next_page_token: ""
};

export const nearby_lodgings = createSlice({
  name: "NearbyLodging",
  initialState,
  reducers: {
    setNearbyLodgings: (_, action: PayloadAction<T>) => {
      return action.payload;
    },
  },
});

export const { setNearbyLodgings } = nearby_lodgings.actions;
export default nearby_lodgings.reducer;
