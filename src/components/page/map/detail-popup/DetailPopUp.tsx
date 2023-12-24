import { PlaceDetailsType } from "@/lib/types/place-detail";
import DetailPopUPCard from "./DetailPopUPCard";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import useLocation from "@/lib/hooks/useLocation";
import usePlaceSession from "@/lib/hooks/usePlaceSession";
export default function DetailPopUp() {
  const {
    location: { lat, lng },
  } = useLocation();
  const { place_session } = usePlaceSession();
  const search_params = useSearchParams();
  const place_id = search_params.get("place_id");
  const [place, setPlace] = useState<PlaceDetailsType>();
  const [api_error, setAPIError] = useState<number>();

  async function getPlace() {
    try {
      const api_response = await fetch(
        `/api/place/detail?place_id=${place_id}&lat=${lat!}&lng=${lng}`
      );

      if (api_response.status !== 200) {
        setAPIError(api_response.status);
        return;
      }

      const { data } = await api_response.json();
      setPlace(data);
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    if (!place_id || !place_session) return;

    const filtered_place = place_session.filter(
      (place) => place.place_id === place_id
    );
    if (!filtered_place) {
      getPlace();
      return;
    }
    setPlace(filtered_place[0]);
  }, [place_id, place_session]);

  return place_id && place ? <DetailPopUPCard data={place!} /> : null;
}
