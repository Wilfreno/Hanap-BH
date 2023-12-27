"use client";
import { useEffect, useMemo, useState } from "react";
import { PlaceDetailsType } from "../types/place-detail";
import useLocation from "./useLocation";
import useErrorHandler from "./useErrorHandler";
import useLocalStorage from "./useLocalStorage";

export default function useNearbyPlacesAPI() {
  const [data, setData] = useState<PlaceDetailsType[]>();
  const { location, location_data, saveLocation } = useLocation();
  const { errorHandler } = useErrorHandler();
  const nearby_place_local_storage = useLocalStorage("nearby_places");
  const next_page_token_local_storage = useLocalStorage("next_page_token");
  async function getNearbyPlaces() {
    if (location.lat && location.lng) {
      if (
        location_data &&
        location_data?.lat! === location.lat &&
        location_data?.lng! === location.lng
      ) {
        if (nearby_place_local_storage.data)
          setData(nearby_place_local_storage.data);
        return;
      }
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
        nearby_place_local_storage.save(data);
        next_page_token_local_storage.save(next_page_token);
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
