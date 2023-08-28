import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SliceType = {
  isLoaded: boolean;
  loadError?: Error;
};

const initialState: SliceType = {
  isLoaded: false,
  loadError: undefined,
};

export const mapIsLoaded = createSlice({
  name: "mapIsLoaded",
  initialState,
  reducers: {
    setAPIIsLoaded: (_, action: PayloadAction<SliceType>) => {
      return {
        isLoaded: action.payload.isLoaded,
        loadError: action.payload.loadError,
      };
    },
  },
});

export const { setAPIIsLoaded } = mapIsLoaded.actions;
export default mapIsLoaded.reducer;
