import { PlaceDetailsType } from "@/lib/types/place-detail";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import DetailPopUPMain from "../detail-popup/DetailPopUp";
import { useSearchParams } from "next/navigation";
import usePlaceSession from "@/lib/hooks/usePlaceSession";
import useLocation from "@/lib/hooks/useLocation";

export default function SearchMarker() {
  const [on_mobile, setOnMobile] = useState(false);
  const { place_session } = usePlaceSession();
  const {
    location: { lat, lng },
  } = useLocation();

  const [place_detail, setPalceDetail] = useState<PlaceDetailsType>();
  const search_params = useSearchParams();
  const place_id = search_params.get("place_id");
  async function getPlaceData() {
    try {
      const api_response = await fetch(
        `/api/place/detail/search?place_id=${place_id}&lat=${lat}&lng=${lng}`
      );
      const api_data = await api_response.json();
      setPalceDetail(api_data);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    if (
      /Mobi|Android/i.test(navigator.userAgent) ||
      /iPhone|iPad|iPod/i.test(navigator.userAgent)
    ) {
      setOnMobile(true);
    } else {
      setOnMobile(false);
    }
  }, [navigator.userAgent]);
  useEffect(() => {
    if (place_id && place_session) {
      const filtered_data = place_session.filter(
        (place) => place.place_id === place_id
      );
      if (filtered_data.length <= 0) {
        getPlaceData();
      }
    }
  }, [place_id, place_session]);
  return place_detail ? (
    <AdvancedMarker
      key={place_detail.place_id}
      position={place_detail.location.coordinates}
      className="cursor-pointer"
    >
      <DetailPopUPMain data={place_detail} on_mobile={on_mobile} />
    </AdvancedMarker>
  ) : null;
}
