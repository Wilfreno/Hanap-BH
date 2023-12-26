"use client";
import Image from "next/image";
import loadingSVG from "../../../../public/icons/loading-transparent.svg";
import dynamic from "next/dynamic";
import useLocation from "@/lib/hooks/useLocation";
import useNextNearbyPlacesAPI from "@/lib/hooks/useNextNearbyPlacesAPI";
import NearbyPlacesMarker from "@/components/page/map/markers/NearbyPlacesMarker";
import UserMarker from "@/components/page/map/markers/UserMarker";
import { APIProvider } from "@vis.gl/react-google-maps";
import Directions from "@/components/page/map/Directions";
import DetailPopUp from "@/components/page/map/detail-popup/DetailPopUp";
import { useSearchParams } from "next/navigation";
const ReusableMap = dynamic(
  () => import("@/components/reusables/ReusableMap"),
  {
    loading: () => (
      <section className="flex items-center justify-center w-screen h-screen bg-gray-500">
        <Image
          src={loadingSVG}
          alt="Loading..."
          className="w-auto h-50"
          priority
        />
      </section>
    ),
  }
);
export default function page() {
  const api_key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY missing");
  const search_params = useSearchParams();
  const place_id = search_params.get("place_id");
  const {
    location: { lat, lng },
  } = useLocation();
  const { place_data } = useNextNearbyPlacesAPI();
  return (
    <section className="flex w-screen h-screen overflow-y-hidden pt-[8vh]">
      <DetailPopUp place_data={place_data!} />

      <APIProvider apiKey={api_key}>
        <ReusableMap zoom={17}>
          <NearbyPlacesMarker datas={place_data!} />
          <UserMarker user_location={{ lat: lat!, lng: lng! }} />
          <Directions place_data={place_data!} />
        </ReusableMap>
      </APIProvider>
    </section>
  );
}
