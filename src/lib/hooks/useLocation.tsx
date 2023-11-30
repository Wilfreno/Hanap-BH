import { useEffect, useState } from "react";
import { LatLngLiteral } from "../types/google-maps-api-type";

export default function useLocation() {
  const [coordinates, setCoordinates] = useState<LatLngLiteral>();
  const [location_error, setError] = useState<GeolocationPositionError>();
  function getLocationSession() {
    const session_data = sessionStorage.getItem("UserLocation");
    if (session_data !== null) setCoordinates(JSON.parse(session_data));
    else setCoordinates(undefined);
    return coordinates;
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
        setError(error);
      }
    );
  }, []);

  return {
    lat: coordinates?.lat,
    lng: coordinates?.lng,
    location_error,
    saveLocation: ({ lat, lng }: LatLngLiteral) =>
      sessionStorage.setItem(
        "userLocation",
        JSON.stringify({
          lat,
          lng,
        })
      ),
    locationSession: getLocationSession(),
  };
}
