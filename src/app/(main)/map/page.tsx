"use client";
import Image from "next/image";
import loadingSVG from "../../../../public/icons/loading-transparent.svg";
import dynamic from "next/dynamic";
import DetailPopUpMobile from "@/components/page/map/detail-popup/DetailPopUpMobile";
import useLocation from "@/lib/hooks/useLocation";
import useNextNearbyPlacesAPI from "@/lib/hooks/useNextNearbyPlacesAPI";
import NearbyPlacesMarker from "@/components/page/map/markers/NearbyPlacesMarker";
import SearchMarker from "@/components/page/map/markers/SearchMarker";
import UserMarker from "@/components/page/map/markers/UserMarker";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import { APIProvider, useMap } from "@vis.gl/react-google-maps";
import Directions from "@/components/page/map/Directions";
import { LatLngLiteral } from "@/lib/types/google-maps-api-type";
import { useState } from "react";
const ReusableMap = dynamic(
  () => import("@/components/reusables/ReusableMap"),
  {
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
  }
);
export default function page() {
  const api_key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY missing");

  const [selected_location, setSelectedLocation] = useState<LatLngLiteral>();

  const {
    location: { lat, lng },
  } = useLocation();
  const { place_data } = useNextNearbyPlacesAPI();



  return (
    <>
      <section className="h-screen w-screen">
        <APIProvider apiKey={api_key}>
          <ReusableMap
            selected_location={(location) => setSelectedLocation(location)}
          >
            
              <Directions
                origin={{ lat: lat!, lng: lng! }}
                destination={selected_location}
              />
            )
            <NearbyPlacesMarker datas={place_data!} />
            <SearchMarker data={place_detail!} />
            <UserMarker user_location={{ lat: lat!, lng: lng! }} />
          </ReusableMap>
        </APIProvider>
        <DetailPopUpMobile data={place_data!} />
      </section>
    </>
  );
}
