"use client";
import Image from "next/image";
import loadingSVG from "../../../../public/icons/loading-transparent.svg";
import dynamic from "next/dynamic";
import NearbyPlacesMarker from "@/components/page/map/markers/NearbyPlacesMarker";
import UserMarker from "@/components/page/map/markers/UserMarker";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useSearchParams } from "next/navigation";

export default function page() {
  const api_key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY missing");
  const search_params = useSearchParams();
  const place_id = search_params.get("place_id");

  return (
    <section className="relative flex w-screen h-screen overflow-y-hidden  md:pt-[8vh]">
      {/* <DetailPopUp place_data={place_data!} />
      <APIProvider apiKey={api_key}>
        <ReusableMap zoom={17}>
          <NearbyPlacesMarker datas={place_data!} />
          <UserMarker user_location={{ lat: lat!, lng: lng! }} />
          <Directions place_data={place_data!} />
        </ReusableMap>
      </APIProvider> */}
    </section>
  );age
}
