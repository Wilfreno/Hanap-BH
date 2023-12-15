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
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import { APIProvider, useMap } from "@vis.gl/react-google-maps";
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
  const search_params = useSearchParams();
  const map = useMap();
  const place_id = search_params.get("place_id");
  const [place_detail, setPalceDetail] = useState<PlaceDetailsType>();
  const api_key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY missing");
  async function getPlaceData() {
    try {
      const api_response = await fetch(
        `/api/place-detail/search?place_id=${place_id}`
      );
      const api_data = await api_response.json();
      setPalceDetail(api_data);
    } catch (error) {
      throw error;
    }
  }
  if (!place_id) map?.setZoom(15);

  useEffect(() => {
    if (place_id !== null && place_data?.[0].place_id !== "") {
      const filter = place_data!.filter((place) => place.place_id === place_id);
      if (filter.length <= 0) {
        getPlaceData();
      }
    }
  }, [place_id]);

  const {
    location: { lat, lng },
  } = useLocation();
  const { place_data } = useNextNearbyPlacesAPI();

  return (
    <>
      <section className="h-screen w-screen">
        <APIProvider apiKey={api_key}>
          <ReusableMap>
            <NearbyPlacesMarker datas={place_data!} />
            {place_detail?.place_id !== "" ? (
              <SearchMarker data={place_detail!} />
            ) : null}
            <UserMarker user_location={{ lat: lat!, lng: lng! }} />
          </ReusableMap>
        </APIProvider>
        <DetailPopUpMobile data={place_data!} />
      </section>
    </>
  );
}
