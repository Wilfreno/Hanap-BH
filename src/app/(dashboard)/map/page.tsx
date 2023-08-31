"use client";

import Map from "@/components/Dashboard/map/Map";
import { Wrapper } from "@googlemaps/react-wrapper";

export default function page() {
  const apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  if (!apiKey) throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY missing");

  
  return (
    <>
      <Wrapper apiKey={apiKey} version="beta" libraries={["marker"]}>
        <Map />
      </Wrapper>
    </>
  );
}
