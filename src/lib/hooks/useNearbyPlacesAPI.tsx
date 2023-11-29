import { useEffect, useState } from "react";
import { PlaceDetailsType } from "../types/place-detail";
import usePlaceSession from "./usePlaceSession";
import useNextPageSession from "./useNextPageSession";
import useLocation from "./useLocation";

export default function useNearbyPlacesAPI() {
  const [error, setError] = useState<number>();
  const [data, setData] = useState<PlaceDetailsType[]>();
  const [next_page_token, setNextPageToken] = useState<string>();

  const { lat, lng, location_error, saveLocation, locationSession } =
    useLocation();
  const place_session = usePlaceSession();
  const next_page_token_session = useNextPageSession();
  async function getNearbyPlaces() {
    if (lat && lng) {
      if (locationSession?.lat === lat && locationSession?.lng === lng) {
        return;
      }
      try {
        const api_response = await fetch(
          `/api/nearby-places?lat=${lat}&lng=${lng}`,
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
        place_session.save(data);
        next_page_token_session.save(next_page_token);
        saveLocation({
          lat: locationSession?.lat!,
          lng: locationSession?.lng!,
        });
      } catch (error) {
        throw error;
      }
    }
  }
  useEffect(() => {
    getNearbyPlaces();
  }, [location]);
  return { data, next_page_token, error, location_error };
}
