"use client";

import { useEffect } from "react";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { useDispatch } from "react-redux";
import { setNearbyLodgings } from "@/lib/redux/slice/nearby-lodgings";
import { getNearbyLodgings } from "@/lib/server/actions/getNearbyLodgings";

export default function FetchNearbyLodging() {
  const user_location = useAppSelector((state) => state.user_location_reducer);
  const dispatch = useDispatch<AppDispatch>();

  return null;
}
