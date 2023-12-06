import { useEffect, useState } from "react";
import { PlaceDetailsType } from "../types/place-detail";

export default function useSelectedPlaceSession() {
  const [data, setData] = useState<PlaceDetailsType>();

  useEffect(() => {
    const session_data = sessionStorage.getItem("selectedPlace");
    if (session_data) {
      setData(JSON.parse(session_data));
    }
  }, []);
  return {
    save: (p: PlaceDetailsType) => {
      setData(p);
      sessionStorage.setItem("selectedPlace", JSON.stringify(data));
    },
    selected_place: data,
  };
}
