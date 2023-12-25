"use client";
import { useEffect, useState } from "react";
import { PlaceDetailsType } from "../types/place-detail";

export default function usePlaceStorage() {
  const [data, setData] = useState<PlaceDetailsType[]>();
  useEffect(() => {
    const places_data = localStorage.getItem("NearbyPlace");
    if (places_data !== null) setData(JSON.parse(places_data));
  }, []);
  return {
    savePlace: (pd: PlaceDetailsType[]) => {
      localStorage.setItem("NearbyPlace", JSON.stringify(pd));
    },
    place_data: data,
  };
}
