import { useEffect, useState } from "react";

export default function useNavigatorGetCurrentPosition(): [
  GeolocationCoordinates | undefined,
  GeolocationPositionError | undefined
] {
  const [coordinates, setCoordinates] = useState<GeolocationCoordinates>();
  const [error, setError] = useState<GeolocationPositionError>();
  useEffect(() => {
    if (!navigator.geolocation.getCurrentPosition) {
      throw new Error("Location detector is not supported in your browser");
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates(position.coords);
      },
      (error) => {
        setError(error);
      }
    );
  }, []);
  return [coordinates, error];
}
