"use client";
import { Map, useApiIsLoaded } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { LocationType } from "@/lib/types/user-detail-type";
import { useAppSelector } from "@/lib/redux/store";

export default function GoogleMap({
  children,
  className,
  selected_location,
  zoom,
  center,
}: {
  children?: React.ReactNode;
  className?: string;
  selected_location?: (s: LocationType) => void;
  zoom: number;
  center?: LocationType;
}) {
  const [selected, setSelected] = useState<LocationType>();
  const user_location = useAppSelector((state) => state.user_location_reducer);
  const is_loaded = useApiIsLoaded();

  useEffect(() => {
    if (selected_location && selected) selected_location(selected);
  }, [selected]);

  console.log(center);
  return (
    is_loaded && (
      <Map
        restriction={{
          latLngBounds: {
            north: 21.1321,
            south: 4.22599,
            west: 114.095,
            east: 128.604,
          },
          strictBounds: true,
        }}
        mapTypeControl={false}
        fullscreenControl={false}
        clickableIcons={false}
        disableDefaultUI={true}
        mapId={"df72364d02a886f2"}
        gestureHandling="greedy"
        zoom={zoom}
        center={
          center
            ? { lat: center.latitude!, lng: center.longitude! }
            : {
                lat: user_location?.latitude!,
                lng: user_location?.longitude!,
              }
        }
        className={cn(
          "w-full h-full outline-none focus-visible:ring-0 focus-visible:border-none",
          className
        )}
        onClick={(e) =>
          setSelected({
            latitude: e.detail.latLng?.lat,
            longitude: e.detail.latLng?.lng,
          })
        }
      >
        {children}
      </Map>
    )
  );
}
