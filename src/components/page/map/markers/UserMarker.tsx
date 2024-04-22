import { setUserLocation } from "@/lib/redux/slice/user-location";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function UserMarker() {
  const user_location = useAppSelector((state) => state.user_location_reducer);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          );
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
    <AdvancedMarker
      position={{
        lat: user_location.latitude!,
        lng: user_location.longitude!,
      }}
    >
      <span className=" flex flex-col justify-center">
        <p className="text-xs font-bold">You&apos;re here!</p>
        <MapPinIcon className="h-7 w-auto animate-bounce dark:text-background" />
      </span>
    </AdvancedMarker>
  );
}
