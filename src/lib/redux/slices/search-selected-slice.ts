import { AutocompleteType } from "@/lib/types/google-autocomplete-type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: AutocompleteType = {
  description: "",
  place_id: "",
  vicinity: "",
};

export const searchSelected = createSlice({
  name: "searchSelected",
  initialState,
  reducers: {
    setSearchSelected: (_, action: PayloadAction<AutocompleteType>) => {
      return {
        description: action.payload.description,
        place_id: action.payload.place_id,
        vicinity: action.payload.vicinity,
      };
    },
  },
});

export const { setSearchSelected } = searchSelected.actions;
export default searchSelected.reducer;
