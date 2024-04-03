import { configureStore } from "@reduxjs/toolkit";
import user_location_reducer from "./slice/user-location";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: { user_location_reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
