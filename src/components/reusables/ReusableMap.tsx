"use client";
import useLocation from "@/lib/hooks/useLocation";
import { LatLngLiteral } from "@/lib/types/google-maps-api-type";
import { APIProvider, Map, useApiIsLoaded } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";

export default function ReusableMap({
  children,
  style,
  selected_location,
}: {
  children?: React.ReactNode;
  style?: string;
  selected_location?: (s: LatLngLiteral) => void;
}) {
  const [selected, setSelected] = useState<LatLngLiteral>();
  const is_loaded = useApiIsLoaded();
  const { location } = useLocation();

  useEffect(() => {
    selected_location!(selected!);
  }, [selected]);

  return is_loaded && location.lat && location.lng ? (
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
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      mapId="671365b374be82"
      zoom={15}
      center={{ lat: location.lat!, lng: location.lng! }}
      className={`w-full h-full ${style}`}
      onClick={(e) => setSelected(e.detail.latLng!)}
    >
      {children}
    </Map>
  ) : null;
}
