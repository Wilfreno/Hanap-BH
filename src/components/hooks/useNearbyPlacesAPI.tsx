"use client";
import { useEffect, useState } from "react";
import { PlaceDetailsType } from "../../lib/types/place-detail";
import useHTTPRequest from "./useHTTPRequest";
import useCurrentPosition from "./useCurrentPosition";
import { HTTPStatusResponseType } from "@/lib/types/http-request-response";

export default function useNearbyPlacesAPI() {
  const [data, setData] = useState<PlaceDetailsType[]>([]);
  const [status, setStatus] = useState<HTTPStatusResponseType>();
  const [next_page_token, setNextPageToken] = useState<string>();
  const { coordinates } = useCurrentPosition();
  const http_request = useHTTPRequest();

  useEffect(() => {
    async function getNearbyPlace() {
      const response = await http_request.get("/api/place/nearby", {
        lat: String(coordinates?.lat),
        lng: String(coordinates?.lng),
      });

      setData(response.data);
      setStatus(response.status);
      sessionStorage.setItem("nearby_place", JSON.stringify(response.data));
      if (response.next_page_token)
        sessionStorage.setItem("next_page_token", response.next_page_token);
    }
    const nearby_place_session = sessionStorage.getItem("nearby_place");
    const next_page_token_session = sessionStorage.getItem("next_page_token");
    setNextPageToken(next_page_token_session!);
    if (
      coordinates &&
      !nearby_place_session &&
      nearby_place_session !== "null"
    ) {
      getNearbyPlace();
    }
    if (nearby_place_session && nearby_place_session !== "null")
      setData(JSON.parse(nearby_place_session));
  }, [coordinates]);

  return {
    next_page_token,
    status,
    nearby_place: data,
    next: async () => {
      const session_token = sessionStorage.getItem("next_page_token");
      if (session_token) {
        const response = await http_request.get("/api/place/nearby/next", {
          page_token: session_token,
          lat: coordinates?.lat,
          lng: coordinates?.lng,
        });
        setData((prev) => [...prev!, ...response.data]);
        setNextPageToken(response.next_page_token);
        sessionStorage.setItem(
          "nearby_place",
          JSON.stringify([...data!, ...response.data])
        );
        sessionStorage.setItem("next_page_token", response.next_page_token);
      }
    },
  };
}
