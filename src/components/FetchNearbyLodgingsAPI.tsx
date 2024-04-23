"use client";

import { useEffect, useState } from "react";
import UseHTTPRequest from "./hooks/useHTTPRequest";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import {
  APIResponseType,
  APIStatusResponseType,
} from "@/lib/types/api-request-response";
import { useDispatch } from "react-redux";
import { setNearbyLodgings } from "@/lib/redux/slice/nearby-lodgings";

export default function FetchNearbyLodging() {
  const http_request = UseHTTPRequest();
  const user_location = useAppSelector((state) => state.user_location_reducer);
  const nearby_lodgings = useAppSelector(
    (state) => state.nearby_lodging_reducer
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
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
        dispatch(setNearbyLodgings({ data, status }));
        data = [...data, ...(next_page_response.data as LodgingDetailsType[])];
        status = next_page_response.status;
        next_page_token = next_page_response.next_page_token;
      }
    }

    if (user_location.latitude && user_location.longitude) getNearbyPlace();
  }, [user_location]);

  return null;
}
