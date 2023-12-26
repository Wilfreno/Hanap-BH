"use client";

import { PlaceDetailsType } from "@/lib/types/place-detail";
import { useEffect, useState } from "react";
import useLocation from "@/lib/hooks/useLocation";
import PlaceImagePreview from "@/components/page/place-detail/image-preview/PlaceImagePreview";
import UnderConstruction from "@/components/page/error/UnderConstruction";
import PlaceAddress from "@/components/page/place-detail/place-info/PlaceAddress";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
export default function page({ params }: { params: { id: string } }) {
  const nearby_place_local_storage = useLocalStorage("nearby_places");
  const {
    location: { lat, lng },
  } = useLocation();
  const [detail, setDetail] = useState<PlaceDetailsType>();

  const [api_error, setAPIError] = useState<number>();
  async function getPlace() {
    if (!lat && !lng) return;
    try {
      const api_response = await fetch(
        `/api/place/detail?place_id=${params.id}&lat=${lat!}&lng=${lng!}`
      );

      if (api_response.status !== 200) setAPIError(api_response.status);

      const { data } = await api_response.json();
      setDetail(data);
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    const place = nearby_place_local_storage.data?.filter(
      (data: PlaceDetailsType) => data.place_id === params.id
    );
    if (!place || place.length <= 0) {
      console.log(lat);
      console.log(lng);
      getPlace();
      return;
    }
    setDetail(place[0]);
  }, [nearby_place_local_storage.data, lat, lng]);

  return (
    <>
      <section className="mt-[10vh] w-screen">
        <PlaceImagePreview detail={detail!} />
        <PlaceAddress detail={detail!} />
        <UnderConstruction />
      </section>
    </>
  );
}
