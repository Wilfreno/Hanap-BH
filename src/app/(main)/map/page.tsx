"use client";
import Map from "@/components/reusables/Map";
import { APIProvider } from "@vis.gl/react-google-maps";

export default function page() {
  const api_key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY missing");

  return (
    <>
      <APIProvider apiKey={api_key}>
        <Map zoom={17} />
      </APIProvider>
    </>
  );
}
