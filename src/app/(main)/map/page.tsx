"use client";
import Image from "next/image";
import loadingSVG from "../../../../public/loading-transparent.svg";
import dynamic from "next/dynamic";
import DetailPopUpMobile from "@/components/page/map/detail-popup/DetailPopUpMobile";
import { useAppSelector } from "@/lib/redux/store";
import { useEffect } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
const MapSection = dynamic(() => import("@/components/page/map/MapSection"), {
  loading: () => (
    <section className="h-screen w-screen flex items-center justify-center bg-gray-500">
      <Image
        src={loadingSVG}
        alt="Loading..."
        className="h-50 w-auto"
        priority
      />
    </section>
  ),
});
export default function page() {
  const map_center = useAppSelector(
    (state) => state.map_center_reducer.coordinates
  );
  const user_location = useAppSelector(
    (state) => state.user_location_reducer.coordinates
  );
  const nearby_places = useAppSelector(
    (state) => state.nearby_places_details_reducer
  );
  useEffect(() => {}, [map_center, user_location, nearby_places]);
  const api_key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY missing");
  return (
    <>
      <section className="h-screen w-screen">
        <APIProvider apiKey={api_key}>
          <MapSection
            map_center={{ lat: map_center.lat!, lng: map_center.lng! }}
            user_location={{ lat: user_location.lat!, lng: user_location.lng! }}
            data={nearby_places}
          />
        </APIProvider>
      </section>
      <DetailPopUpMobile data={nearby_places!} />
    </>
  );
}
