import { useEffect, useState } from "react";
import useNextPageSession from "./useNextPageSession";
import usePlaceSession from "./usePlaceSession";
import useLocation from "./useLocation";
import { PlaceDetailsType } from "../types/place-detail";

export default function useNextNearbyPlacesAPI() {
  const [error, setError] = useState<number>();
  const { savePlace, getPlace } = usePlaceSession();
  const [place_data, setPlaceData] = useState<PlaceDetailsType[]>();
  const { saveToken, getToken } = useNextPageSession();
  const [next_page, setNextPageToken] = useState<string | null>();
  const {
    location: { lat, lng },
  } = useLocation();
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
      console.log(data);
      setPlaceData((prev) => [...prev!, ...data]);
      setNextPageToken(next_page_token);
      savePlace(place_data!);
      saveToken(next_page!);
      getNextPage();
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    setPlaceData(getPlace());
    setNextPageToken(getToken());
    getNextPage();
  }, []);
  return {
    error,
    place_data,
  };
}
