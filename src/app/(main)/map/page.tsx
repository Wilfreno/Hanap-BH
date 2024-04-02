"use client";
import useNearbyPlacesAPI from "@/components/hooks/useNearbyPlacesAPI";
import Markers from "@/components/page/map/markers/Markers";
import Search from "@/components/page/search/Search";
import Map from "@/components/reusables/Map";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { ControlPosition, MapControl, useMap } from "@vis.gl/react-google-maps";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const { nearby_lodgings } = useNearbyPlacesAPI();
  const [result, setResult] = useState<LodgingDetailsType[]>();
  const router = useRouter();
  if (result && result.length > 0)
    router.replace(`/map?lodging_id=${result[0].id}`);

  return (
    <main className="grid">
      <Map zoom={17}>
        <MapControl position={ControlPosition.TOP_RIGHT}>
          <section className="mx-10">
            <Search result={(r) => setResult(r)} />
          </section>
        </MapControl>
        <Markers lodgings={result ? result : nearby_lodgings} />
      </Map>
    </main>
  );
}
