import { useEffect, useState } from "react";
export default function useNavigatorWatchPosition() {
  const [coordinates, setCoordinates] = useState<GeolocationCoordinates>();
  const [error, setError] = useState<GeolocationPositionError>();
  useEffect(() => {
    const watch_id = navigator.geolocation.watchPosition(
      (position) => {
        setCoordinates(position.coords);
      },
      (error) => {
        setError(error);
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watch_id);
    };
  }, []);
  return [coordinates, error];
}
