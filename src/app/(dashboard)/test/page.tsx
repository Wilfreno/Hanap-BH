"use client";

import { getGeocode, getReverseGeocode } from "@/lib/google-api/geocode";
import { useAppSelector } from "@/lib/redux/store";
import { LatLngLiteral } from "@/lib/types/google-maps-api-type";
import { useEffect, useState } from "react";

export default function test() {
  const [location, setLocation] = useState({});
  const userLocation = useAppSelector((state) => state.userLocationReducer);

  async function getLocation() {
    try {
      const {
        coordinates: { lat, lng },
      } = userLocation;
      if (lat !== undefined && lng !== undefined) {
        const response = await getReverseGeocode({ lat, lng });
        setLocation(response);
        console.log("response: ", response);
      }
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getLocation();
  }, [userLocation]);

  return <></>;
}
