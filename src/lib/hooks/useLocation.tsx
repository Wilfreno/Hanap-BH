import { useEffect, useState } from "react";
import { LatLngLiteral } from "../types/google-maps-api-type";
import useErrorHandler from "./useErrorHandler";

export default function useLocation() {
  const [coordinates, setCoordinates] = useState<LatLngLiteral>();
  const { errorHandler } = useErrorHandler();
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
        errorHandler(400);
        throw error;
      }
    );
  }, []);

  return {
    getSession: () => {
      const session_data = sessionStorage.getItem("UserLocation");
      if (session_data !== null) return JSON.parse(session_data);
      else return null;
    },
    location: { lat: coordinates?.lat, lng: coordinates?.lng },
    saveLocation: ({ lat, lng }: LatLngLiteral) =>
      sessionStorage.setItem(
        "userLocation",
        JSON.stringify({
          lat,
          lng,
        })
      ),
  };
}
