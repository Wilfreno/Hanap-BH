import { LatLngLiteral } from "@/lib/types/google-maps-api-type";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useCurrentPosition() {
  const [coordinates, setCoordinates] = useState<LatLngLiteral>();

  useEffect(() => {
    if (!navigator.geolocation.getCurrentPosition) {
      toast("Error", {
        description: "Location detector is not supported in your browser",
        action: { label: "ok", onClick: () => null },
      });
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        toast(error.code, {
          description: error.message,
          action: { label: "ok", onClick: () => null },
        });
      }
    );
  }, []);

  return { coordinates };
}
