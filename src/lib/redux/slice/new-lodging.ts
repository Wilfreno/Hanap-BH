import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Omit<
  LodgingDetailsType,
  "id" | "distance" | "date_created"
> = {
  house_rules: "",
  location: {
    id: "",
    address: "",
    province: "",
    municipality_city: "",
    barangay: "",
    street: "",
    longitude: 0,
    latitude: 0,
  },
  lodging_type: "",
  owner_id: "",
  name: "",
  database: "POSTGERSQL",
};

export const new_lodging = createSlice({
  name: "CreateSlice",
  initialState,
  reducers: {
    setNewLodging: (
      _,
      action: PayloadAction<
        Omit<LodgingDetailsType, "id" | "distance" | "date_created">
      >
    ) => {
      return action.payload;
    },
  },
});

export const { setNewLodging } = new_lodging.actions;
export default new_lodging.reducer;
