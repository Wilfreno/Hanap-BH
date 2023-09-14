import { PlaceDetailType } from "@/lib/types/google-place-api-types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type selectedDetailType = {
  place_id: string;
};

const initialState: selectedDetailType = {
  place_id: "",
};

export const selectedDetail = createSlice({
  name: "selectedDetail",
  initialState,
  reducers: {
    setSelectedDetail: (_, action: PayloadAction<selectedDetailType>) => {
      const { place_id } = action.payload;

      return {
        place_id,
      };
    },
  },
});

export const { setSelectedDetail } = selectedDetail.actions;
export default selectedDetail.reducer;
