"use client"
import { useState } from "react";
import { PlaceDetailsType } from "../types/place-detail";

export default function usePlaceSession() {
  const [data, setData] = useState<PlaceDetailsType[]>();
  return {
    save: (pd: PlaceDetailsType[]) => {
      setData(pd);
      sessionStorage.setItem("NearbyPlace", JSON.stringify(pd));
    },
    get: () => {
      const session_data = sessionStorage.getItem("NearbyPlace");
      if (session_data !== null) setData(JSON.parse(session_data));
      return data;
    },
  };
}
