import { useEffect, useState } from "react";
import useLocation from "./useLocation";
import { PlaceDetailsType } from "../types/place-detail";
import useNearbyPlacesAPI from "./useNearbyPlacesAPI";
import useLocalStorage from "./useLocalStorage";

export default function useNextNearbyPlacesAPI() {
  const [error, setError] = useState<number>();
  const { data } = useNearbyPlacesAPI();
  const [new_data, setData] = useState<PlaceDetailsType[]>();
  const nearby_place_local_storage = useLocalStorage("nearby_places");
  const next_page_token_local_storage = useLocalStorage("next_page_token");
  const {
    location: { lat, lng },
  } = useLocation();

  async function getNextPage() {
    if (!next_page_token_local_storage.data || !data) return;
    try {
      const api_response = await fetch(
        `/api/nearby-places/next?page_token=${next_page_token_local_storage.data}&lat=${lat}&lng=${lng}`,
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
      nearby_place_local_storage.save(new_data);
      next_page_token_local_storage.save(next_page_token);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    setData(data);
    getNextPage();
  }, [data, next_page_token_local_storage.data]);

  return {
    error,
    place_data: new_data,
  };
}
