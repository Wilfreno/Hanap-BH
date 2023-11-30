"use client";
import Image from "next/image";
import loadingSVG from "../../../../public/loading-transparent.svg";
import dynamic from "next/dynamic";
import DetailPopUpMobile from "@/components/page/map/detail-popup/DetailPopUpMobile";
import { APIProvider } from "@vis.gl/react-google-maps";
import useLocation from "@/lib/hooks/useLocation";
import useNextNearbyPlacesAPI from "@/lib/hooks/useNextNearbyPlacesAPI";
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
  const api_key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY missing");
  const { lat, lng } = useLocation();
  const { place_data, error } = useNextNearbyPlacesAPI();
  return (
    <>
      <section className="h-screen w-screen">
        <APIProvider apiKey={api_key}>
          <MapSection
            map_center={{ lat: lat!, lng: lng! }}
            user_location={{ lat: lat!, lng: lng! }}
            data={place_data!}
          />
        </APIProvider>
      </section>
      <DetailPopUpMobile data={place_data!} />
    </>
  );
}
