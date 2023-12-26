import { useEffect, useState } from "react";
import useNextPageSession from "./useNextPageSession";
import usePlaceSession from "./usePlaceStorage";
import useLocation from "./useLocation";
import { PlaceDetailsType } from "../types/place-detail";
import useNearbyPlacesAPI from "./useNearbyPlacesAPI";

export default function useNextNearbyPlacesAPI() {
  const [error, setError] = useState<number>();
  const { savePlace, place_data } = usePlaceSession();
  const nearby_places_api = useNearbyPlacesAPI();
  const [data, setData] = useState<PlaceDetailsType[]>();
  const { saveToken, token_session } = useNextPageSession();
  const {
    location: { lat, lng },
  } = useLocation();
  async function getNextPage() {
    if (!token_session) return;
    try {
      const api_response = await fetch(
        `/api/nearby-places/next?page_token=${token_session}&lat=${lat}&lng=${lng}`,
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
      setData((prev) => Array.from(new Set([...prev!, ...data])));
      savePlace(place_data!);
      saveToken(next_page_token);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    setData(place_data);
    getNextPage();
  }, [nearby_places_api.data, token_session]);

  return {
    error,
    place_data,
  };
}
