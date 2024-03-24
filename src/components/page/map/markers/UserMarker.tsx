import { MapPinIcon } from "@heroicons/react/24/solid";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { LatLngLiteral } from "@/lib/types/google-maps-api-type";
import { toast } from "sonner";
import useCurrentPosition from "@/components/hooks/useCurrentPosition";
export default function UserMarker() {
  const { coordinates } = useCurrentPosition();
  const [user_position, setUserPosition] = useState<LatLngLiteral>();

  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
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
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AdvancedMarker
        position={
          user_position
            ? { lat: user_position?.lat!, lng: user_position?.lng! }
            : coordinates
        }
      >
        <span className=" flex flex-col justify-center">
          <p className="text-xs font-bold">You're here!</p>
          <MapPinIcon className="h-7 w-auto animate-bounce dark:text-background" />
        </span>
      </AdvancedMarker>
    </>
  );
}
