import { useEffect, useState } from "react";
import { LatLngLiteral } from "../types/google-maps-api-type";
import useErrorHandler from "./useErrorHandler";

export default function useLocation() {
  const [coordinates, setCoordinates] = useState<LatLngLiteral>();
  const [storage, setStorage] = useState<LatLngLiteral>();
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
  useEffect(() => {
    const storage_data = localStorage.getItem("UserLocation");
    if (storage_data) return setStorage(JSON.parse(storage_data));
  }, [coordinates]);

  return {
    location_data: storage,
    location: { lat: coordinates?.lat, lng: coordinates?.lng },
    saveLocation: ({ lat, lng }: LatLngLiteral) => {
      setStorage({ lat, lng });
      localStorage.setItem(
        "userLocation",
        JSON.stringify({
          lat,
          lng,
        })
      );
    },
  };
}
