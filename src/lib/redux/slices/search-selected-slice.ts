import { AutocompleteType } from "@/lib/types/google-autocomplete-type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: AutocompleteType = {
  description: "",
  place_id: "",
  structured_formatting: {
    secondary_text: "",
  },
};

export const searchSelected = createSlice({
  name: "searchSelected",
  initialState,
  reducers: {
    setSearchSelected: (_, action: PayloadAction<AutocompleteType>) => {
      return {
        description: action.payload.description,
        place_id: action.payload.place_id,
        structured_formatting: {
          secondary_text: action.payload.structured_formatting.secondary_text,
        },
      };
    },
  },
});

export const { setSearchSelected } = searchSelected.actions;
export default searchSelected.reducer;
