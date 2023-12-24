"use client";
import { useEffect, useState } from "react";
import { PlaceDetailsType } from "../types/place-detail";

export default function usePlaceSession() {
  const [place, setPlace] = useState<PlaceDetailsType[]>();
  useEffect(() => {
    const session_data = sessionStorage.getItem("NearbyPlace");
    if (session_data !== null) setPlace(JSON.parse(session_data));
  }, []);
  return {
    savePlace: (pd: PlaceDetailsType[]) => {
      sessionStorage.setItem("NearbyPlace", JSON.stringify(pd));
    },
    place_session: place,
  };
}
