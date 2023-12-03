import { useState } from "react";
import { PlaceDetailsType } from "../types/place-detail";

export default function useSelectedPlaceSession() {
  const [data, setData] = useState<PlaceDetailsType>();
  function getSelectedPlace() {
    const session_data = sessionStorage.getItem("selectedPlace");
    if (session_data) {
      setData(JSON.parse(session_data));
      return data;
    }
    return null;
  }
  return {
    save: (p: PlaceDetailsType) => {
      setData(p);
      sessionStorage.setItem("selectedPlace", JSON.stringify(data));
    },
    data: getSelectedPlace(),
  };
}
