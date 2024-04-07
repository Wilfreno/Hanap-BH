"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LocationDeniedMapPinIcon from "../svg/LocationDeniedMapPinIcon";
import { setUserLocation } from "@/lib/redux/slice/user-location";

export default function LocationAccesDenied({
  children,
}: {
  children: React.ReactNode;
}) {
  const [get_position, setGetPosition] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const path_name = usePathname();
  const searchParams = useSearchParams();
  const location = searchParams.get("location");

  function getPosition() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
        router.push(path_name);
      },
      (error) => {
        if (error.PERMISSION_DENIED)
          router.replace(`${path_name}?location=off`);
        setGetPosition(false);
      }
    );
  }

  useEffect(() => {
    if (!navigator.geolocation.getCurrentPosition) {
      toast("Error", {
        description: "Location detector is not supported in your browser",
        action: { label: "ok", onClick: () => null },
      });
      return;
    }
    if (get_position) getPosition();
  }, [get_position]);

  return location === "off" ? (
    <main className="grid place-items-center place-content-center space-y-5">
      <LocationDeniedMapPinIcon className="h-12 w-auto stroke-2 stroke-primary " />
      <div>
        <p className="text-center">Location access is denied</p>
        <p>
          to continue using this site please allow it to acces your location
        </p>
      </div>
      <Button
        className="mx-auto"
        type="button"
        onClick={() => setGetPosition(true)}
      >
        Turn on
      </Button>
    </main>
  ) : (
    children
  );
}
