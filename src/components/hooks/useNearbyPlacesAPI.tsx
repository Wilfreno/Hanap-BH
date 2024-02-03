"use client";
import { useEffect, useState } from "react";
import { PlaceDetailsType } from "../../lib/types/place-detail";
import { LatLngLiteral } from "../../lib/types/google-maps-api-type";
import { toast } from "sonner";
import useSessionStorage from "./useSessionStorage";
import useHTTPRequest from "./useHTTPRequest";

export default function useNearbyPlacesAPI() {
  const [data, setData] = useState<PlaceDetailsType[]>();
  const [coordinates, setCoordinates] = useState<LatLngLiteral>();
  const session_storage = useSessionStorage();
  const http_request = useHTTPRequest();
  async function getNearbyPlace() {
    const response = await http_request.get(
      `/api/nearby-places?lat=${coordinates?.lat}&lng=${coordinates?.lng}`
    );
    setData(response.data);
    session_storage.set("nearby_place", response.data);
    if (response.next_page_token)
      session_storage.set("next_page_token", response.next_page_token);
  }
  useEffect(() => {
    if (!navigator.geolocation.getCurrentPosition) {
      throw new Error("Location detector is not supported in your browser");
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        toast(error.code, {
          description: error.message,
          action: { label: "ok", onClick: () => null },
        });
      }
    );
  }, []);

  useEffect(() => {
    if (coordinates && !session_storage.get("nearby_place")) {
      getNearbyPlace();
    }
    if (session_storage.get("nearby_place")) {
      const d = session_storage.get("nearby_place") as unknown;
      setData(d as PlaceDetailsType[]);
    }
  }, [coordinates]);
  return {
    nearby_place: data,
    next: async () => {
      const next_page_token = session_storage.get("next_page_token");
      if (next_page_token) {
        const response = await http_request.get(
          `/api/nearby-places/next?page_token=${next_page_token}&lat=${coordinates?.lat}&lng=${coordinates?.lng}`
        );

        setData((prev) => [...prev!, ...response.data]);
        session_storage.set("nearby_place", data!);
        session_storage.set("next_page_token", response.next_page_token);
      }
    },
  };
}
