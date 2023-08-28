"use client";

import Map from "@/components/Dashboard/map/Map";
import styles from "@/components/Dashboard/map/Map.module.css";
import { useAppSelector } from "@/lib/redux/store";
import { LatLngLiteral, MapOptions } from "@/lib/types/google-map-type";
import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";

export default function page() {
  const apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  if (!apiKey) throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY missing");

  const isLoaded = useAppSelector(
    (state) => state.mapLoaderStateReducer.isLoaded
  );

  const loadError = useAppSelector(
    (state) => state.mapLoaderStateReducer.loadError
  );
  const userLocation = useAppSelector(
    (state) => state.userLocationReducer.coordinates
  );

  const options = useMemo<MapOptions>(
    () => ({
      restriction: {
        latLngBounds: {
          north: 21.1321,
          south: 4.22599,
          west: 114.095,
          east: 128.604,
        },
        strictBounds: true,
      },
      mapTypeControl: false,
      fullscreenControl: true,
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  return (
    <>
      {isLoaded && (
        <Map
          center={{ lat: userLocation.lat, lng: userLocation.lng }}
          options={options}
        />
      )}
    </>
  );
}
