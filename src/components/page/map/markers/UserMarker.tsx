import { useAppSelector } from "@/lib/redux/store";
import { LocationType } from "@/lib/types/user-detail-type";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function UserMarker() {
  const [user_position, setUserPosition] = useState<LocationType>();

  const user_location = useAppSelector((state) => state.user_location_reducer);
  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
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
            ? {
                lat: user_position?.latitude!,
                lng: user_position?.longitude!,
              }
            : {
                lat: user_location?.latitude!,
                lng: user_location?.longitude!,
              }
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
