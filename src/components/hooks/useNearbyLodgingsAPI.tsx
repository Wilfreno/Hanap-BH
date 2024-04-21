"use client";
import { useEffect, useState } from "react";
import UseHTTPRequest from "./useHTTPRequest";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { useAppSelector } from "@/lib/redux/store";
import {
  APIResponseType,
  APIStatusResponseType,
} from "@/lib/types/api-request-response";

export default function useNearbyLodgingAPI() {
  const [nearby_lodgings, setNearbyLodgings] = useState<LodgingDetailsType[]>(
    []
  );
  const [request_status, setRequestStatus] = useState<APIStatusResponseType>();
  const http_request = UseHTTPRequest();
  const user_location = useAppSelector((state) => state.user_location_reducer);

  async function getNearbyPlace() {
    let data = [];
    let status: APIStatusResponseType;
    let next_page_token: APIResponseType["next_page_token"];
    const response = await http_request.get("/api/lodging/nearby", {
      latitude: String(user_location?.latitude),
      longitude: String(user_location.longitude),
    });

    data = response.data as LodgingDetailsType[];
    status = response.status;
    next_page_token = response.next_page_token;

    while (next_page_token) {
      const next_page_response = await http_request.get(
        "/api/lodging/nearby/next",
        {
          page_token: next_page_token,
          latitude: user_location?.latitude,
          longitude: user_location?.longitude,
        }
      );
      data = [...data, ...(next_page_response.data as LodgingDetailsType[])];
      status = next_page_response.status;
      next_page_token = next_page_response.next_page_token;
    }

    setNearbyLodgings(data);
    setRequestStatus(status);
    sessionStorage.setItem("nearby_lodging", JSON.stringify(data));
  }

  useEffect(() => {
    const nearby_lodging_session = sessionStorage.getItem("nearby_lodging");

    if (nearby_lodging_session) {
      setNearbyLodgings(JSON.parse(nearby_lodging_session));
      return;
    }

    if (user_location.latitude && user_location.longitude) getNearbyPlace();
  }, [user_location, getNearbyPlace]);

  return {
    request_status,
    nearby_lodgings,
  };
}
