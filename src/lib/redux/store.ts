import { configureStore } from "@reduxjs/toolkit";
import userLocationReducer from "./slices/user-location-slice";
import mapLoaderStateReducer from "./slices/google -map-api-is-loaded-slice";
import autoCompleteDetialReducer from "./slices/map-auto-complete-slice.";
import searchSelectedReducer from "./slices/search-selected-slice"
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    userLocationReducer,
    mapLoaderStateReducer,
    autoCompleteDetialReducer,
    searchSelectedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
