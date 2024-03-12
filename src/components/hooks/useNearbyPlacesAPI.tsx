"use client";
import { useEffect, useState } from "react";
import { PlaceDetailsType } from "../../lib/types/place-detail";
import useSessionStorage from "./useSessionStorage";
import useHTTPRequest from "./useHTTPRequest";
import useCurrentPosition from "./useCurrentPosition";
import { HTTPStatusResponseType } from "@/lib/types/http-request-response";

export default function useNearbyPlacesAPI() {
  const [data, setData] = useState<PlaceDetailsType[]>([]);
  const [status, setStatus] = useState<HTTPStatusResponseType>();
  const { coordinates } = useCurrentPosition();
  const session_storage = useSessionStorage();
  const http_request = useHTTPRequest();

  async function getNearbyPlace() {
    const response = await http_request.get(
      `/api/nearby-places?lat=${coordinates?.lat}&lng=${coordinates?.lng}`
    );
    setData(response.data);
    setStatus(response.status);
    session_storage.set("nearby_place", response.data);
    if (response.next_page_token)
      session_storage.set("next_page_token", response.next_page_token);
  }

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
    status,
    nearby_place: data,
    next: async () => {
      const next_page_token = session_storage.get("next_page_token");
      if (next_page_token) {
        const response = await http_request.get(
          `/api/nearby-places/next?page_token=${next_page_token}&lat=${coordinates?.lat}&lng=${coordinates?.lng}`
        );
        setData((prev) => [...prev!, ...response.data]);
        session_storage.set("nearby_place", [...data!, ...response.data]);
        session_storage.set("next_page_token", response.next_page_token);
      }
    },
  };
}
