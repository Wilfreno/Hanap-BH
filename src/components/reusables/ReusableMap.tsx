"use client";
import useLocation from "@/lib/hooks/useLocation";
import { APIProvider, Map, useApiIsLoaded } from "@vis.gl/react-google-maps";
import React from "react";

export default function ReusableMap({
  children,
}: {
  children?: React.ReactNode;
}) {
  const is_loaded = useApiIsLoaded();

  const { location } = useLocation();
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
      className="w-full h-full"
    >
      {children}
    </Map>
  ) : (
    <h1 className="text-7xl">Loading</h1>
  );
}
