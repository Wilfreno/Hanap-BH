"use client";

import Map from "@/components/Dashboard/map/Map";
import { useLoadScript } from "@react-google-maps/api";

export default function page() {
  const apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  if (!apiKey) throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY missing");

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  return <>{isLoaded ? <Map /> : null}</>;
}
