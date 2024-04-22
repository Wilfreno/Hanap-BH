import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { Photo, Room } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface NewLodgingType
  extends Omit<
    LodgingDetailsType,
     | "distance" | "date_created" | "photos" | "rooms" | "ratings"
  > {
  photos?: Omit<Photo, "date_created">[];
  rooms?: Omit<Room, "date_created">[];
}

const initialState: NewLodgingType = {
  id: "",
  house_rules: "",
  lodging_type: "",
  owner_id: "",
  name: "",
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
  database: "POSTGERSQL",
};

export const new_lodging = createSlice({
  name: "CreateSlice",
  initialState,
  reducers: {
    setNewLodging: (_, action: PayloadAction<NewLodgingType>) => {
      return action.payload;
    },
  },
});

export const { setNewLodging } = new_lodging.actions;
export default new_lodging.reducer;
