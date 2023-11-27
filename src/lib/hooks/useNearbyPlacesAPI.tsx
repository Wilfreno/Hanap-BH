import { useEffect, useState } from "react";
import { PlaceDetailsType } from "../types/place-detail";

export default function useNearbyPlacesAPI(location: {
  lat?: number;
  lng?: number;
}): [PlaceDetailsType[] | undefined, string | undefined, number | undefined] {
  const [error, setError] = useState<number>();
  const [data, setData] = useState<PlaceDetailsType[]>();
  const [next_page_token, setNextPageToken] = useState<string>();
  async function getNearbyPlaces() {
    try {
      const api_response = await fetch(
        `/api/nearby-places?lat=${location?.lat}&lng=${location?.lng}`,
        { cache: "no-store" }
      );
      if (api_response.status === 408) {
        setError(408);
        return;
      }
      if (api_response.status === 500) {
        setError(500);
        return;
      }
      const { data, next_page_token } = await api_response.json();
      setData(data);
      setNextPageToken(next_page_token);
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    if (location.lat !== undefined && location.lng !== undefined) {
      getNearbyPlaces();
    }
  }, [location]);
  return [data, next_page_token, error];
}
