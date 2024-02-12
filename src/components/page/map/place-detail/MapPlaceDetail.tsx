import useCurrentPosition from "@/components/hooks/useCurrentPosition";
import useHTTPRequest from "@/components/hooks/useHTTPRequest";
import useNearbyPlacesAPI from "@/components/hooks/useNearbyPlacesAPI";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import { useState } from "react";

export default function MapPlaceDetail() {
  const [place, setPlace] = useState<PlaceDetailsType>();
  const { nearby_place } = useNearbyPlacesAPI();
  const http_request = useHTTPRequest();
  const { coordinates } = useCurrentPosition();
  return <div>MapPlaceDetail</div>;
}
