import { useEffect, useState } from "react";
import useNextPageSession from "./useNextPageSession";
import usePlaceSession from "./usePlaceSession";
import useLocation from "./useLocation";
import { PlaceDetailsType } from "../types/place-detail";

export default function useNextNearbyPlacesAPI() {
  const [error, setError] = useState<number>();
  const [place_data, setPlaceData] = useState<PlaceDetailsType[]>();
  const next_page_token_session = useNextPageSession();
  const [next_page, setNextPageToken] = useState<string | null>();
  const place_session = usePlaceSession();
  const { lat, lng } = useLocation();
  async function getNextPage() {
    if (!next_page) return;
    try {
      const api_response = await fetch(
        `/api/nearby-places/next?pagetoken=${next_page}&lat=${lat}&lng=${lng}`,
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
      setPlaceData((prev) =>
        prev !== undefined ? [...prev, ...data] : [...data]
      );
      setNextPageToken(next_page_token);
      place_session.save(place_data!);
      next_page_token_session.save(next_page!);
      getNextPage();
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    setNextPageToken(next_page_token_session.token);
    getNextPage();
  }, []);
  return {
    error,
    place_data,
  };
}
