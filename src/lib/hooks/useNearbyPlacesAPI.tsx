import { useEffect, useState } from "react";
import { PlaceDetailsType } from "../types/place-detail";
import usePlaceSession from "./usePlaceSession";
import useNextPageSession from "./useNextPageSession";
import useLocation from "./useLocation";
import useErrorHandler from "./useErrorHandler";

export default function useNearbyPlacesAPI() {
  const [data, setData] = useState<PlaceDetailsType[]>();
  const { location, location_session, saveLocation } = useLocation();
  const { savePlace } = usePlaceSession();
  const { saveToken } = useNextPageSession();
  const { errorHandler } = useErrorHandler();

  async function getNearbyPlaces() {
    if (location.lat && location.lng) {
      if (
        location_session &&
        location_session?.lat! === location.lat &&
        location_session?.lng! === location.lng
      )
        return;
      try {
        const api_response = await fetch(
          `/api/nearby-places?lat=${location.lat}&lng=${location.lng}`,
          { cache: "no-store" }
        );
        if (api_response.status !== 200) {
          errorHandler(api_response.status);
          return;
        }

        const { data, next_page_token } = await api_response.json();
        setData(data);
        savePlace(data);
        saveToken(next_page_token);
        saveLocation({
          lat: location.lat,
          lng: location.lng,
        });
      } catch (error) {
        throw error;
      }
    }
  }
  useEffect(() => {
    getNearbyPlaces();
  }, [location]);
  return { data };
}
