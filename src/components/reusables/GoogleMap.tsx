"use client";
import { LatLngLiteral } from "@/lib/types/google-maps-api-type";
import { Map, useApiIsLoaded } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import useCurrentPosition from "../hooks/useCurrentPosition";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export default function GoogleMap({
  children,
  className,
  selected_location,
  zoom,
  center,
}: {
  children?: React.ReactNode;
  className?: string;
  selected_location?: (s: LatLngLiteral) => void;
  zoom: number;
  center?: LatLngLiteral;
}) {
  const { theme } = useTheme();
  const [selected, setSelected] = useState<LatLngLiteral>();
  const { coordinates } = useCurrentPosition();
  const is_loaded = useApiIsLoaded();
  useEffect(() => {
    if (selected_location) selected_location(selected!);
  }, [selected]);

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
        mapId={theme === "dark" ? "f69c5aeeede1b72c" : "df72364d02a886f2"}
        gestureHandling="greedy"
        zoom={zoom}
        center={center ? center : coordinates}
        className={cn(
          "w-full h-full outline-none focus-visible:ring-0 focus-visible:border-none",
          className
        )}
        onClick={(e) => setSelected(e.detail.latLng!)}
      >
        {children}
      </Map>
    )
  );
}
