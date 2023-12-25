"use client";

import { PlaceDetailsType } from "@/lib/types/place-detail";
import { useEffect, useState } from "react";
import usePlaceSession from "@/lib/hooks/usePlaceStorage";
import useLocation from "@/lib/hooks/useLocation";
import PlaceImagePreview from "@/components/page/place-detail/image-preview/PlaceImagePreview";
export default function page({ params }: { params: { id: string } }) {
  const { place_data } = usePlaceSession();
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
    const place = place_data?.filter((data) => data.place_id === params.id);
    if (!place || place.length <= 0) {
      console.log(lat);
      console.log(lng);
      getPlace();
      return;
    }
    setDetail(place[0]);
  }, [place_data, lat, lng]);

  return (
    <>
      <section className="mt-[10vh] w-screen">
        <PlaceImagePreview detail={detail!} />
        {/* <UnderConstruction /> */}
      </section>
    </>
  );
}
