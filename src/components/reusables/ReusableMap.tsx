"use client";
import { LatLngLiteral } from "@/lib/types/google-maps-api-type";
import { Map, useApiIsLoaded } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import useCurrentPosition from "../hooks/useCurrentPosition";
import { cn } from "@/lib/utils";

export default function ReusableMap({
  children,
  style,
  selected_location,
  zoom,
}: {
  children?: React.ReactNode;
  style?: string;
  selected_location?: (s: LatLngLiteral) => void;
  zoom: number;
}) {
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
        mapId="671365b374be82"
        zoom={zoom}
        center={coordinates}
        className={cn(
          "w-full h-full outline-none focus-visible:ring-0 focus-visible:border-none cursor-pointer",
          style
        )}
        onClick={(e) => setSelected(e.detail.latLng!)}
      >
        {children}
      </Map>
    )
  );
}
