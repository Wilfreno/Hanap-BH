import { configureStore } from "@reduxjs/toolkit";
import userLocationReducer from "./slices/user-location-slice";
import autoCompleteDetialReducer from "./slices/map-auto-complete-slice.";
import selectedDetailReducer from "./slices/selected-detail-slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    userLocationReducer,
    autoCompleteDetialReducer,
    selectedDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
