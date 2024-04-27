import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import user_location_reducer from "./slice/user-location";
import new_lodging_reducer from "./slice/new-lodging";
import nearby_lodging_reducer from "./slice/nearby-lodgings";

export const store = configureStore({
  reducer: {
    user_location_reducer,
    new_lodging_reducer,
    nearby_lodging_reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
