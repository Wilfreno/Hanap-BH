import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: LodgingDetailsType = {
  id: "",
  owner_id: "",
  name: "",
  distance: 0,
  database: "POSTGERSQL",
  lodging_type: "",
  address: "",
  latitude: 0,
  longitude: 0,
  house_rules: "",
  date_created: null,
};

export const selected_lodging = createSlice({
  name: "SelectedSlice",
  initialState,
  reducers: {
    setSelectedLodging: (_, action: PayloadAction<LodgingDetailsType>) => {
      return action.payload;
    },
  },
});

export const { setSelectedLodging } = selected_lodging.actions;
export default selected_lodging.reducer;
