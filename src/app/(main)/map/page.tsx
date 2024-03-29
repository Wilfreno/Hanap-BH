"use client";
import useNearbyPlacesAPI from "@/components/hooks/useNearbyPlacesAPI";
import Markers from "@/components/page/map/markers/Markers";
import Search from "@/components/page/search/Search";
import Map from "@/components/reusables/Map";
import { PlaceDetailsType } from "@/lib/types/google-places-api-type";
import { ControlPosition, MapControl, useMap } from "@vis.gl/react-google-maps";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const { nearby_place } = useNearbyPlacesAPI();
  const [result, setResult] = useState<PlaceDetailsType[]>();
  const router = useRouter();
  if (result && result.length > 0)
    router.replace(`/map?place_id=${result[0].place_id}`);

  return (
    <main className="grid">
      <Map zoom={17}>
        <MapControl position={ControlPosition.TOP_RIGHT}>
          <section className="mx-10">
            <Search result={(r) => setResult(r)} />
          </section>
        </MapControl>
        <Markers places={result ? result : nearby_place} />
      </Map>
    </main>
  );
}
