"use client";

import { useAppSelector } from "@/lib/redux/store";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import noImg from "../../../../../public/image-square-xmark-svgrepo-com.svg";
import Image from "next/image";
import UnderConstruction from "@/components/page/error/UnderConstruction";
export default function page({ params }: { params: { id: string } }) {
  const selected_place = useAppSelector(
    (state) => state.selected_detail_reducer
  );
  const nearby_places = useAppSelector(
    (state) => state.nearby_places_details_reducer
  );
  const [db_place, setDBplace] = useState<PlaceDetailsType>();
  const router = useRouter();
  const path_name = usePathname();
  async function getDBPlace() {
    try {
      const api_response = await fetch(
        `/api/place-detail?place_id=${params.id}`
      );

      if (api_response.status === 404) {
        router.replace(`${path_name}?error=404`);
        return;
      }
      if (api_response.status === 500) {
        router.replace(`${path_name}?error=500`);
        return;
      }
      const api_data = await api_response.json();

      setDBplace(api_data.data);
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    if (params.id !== selected_place.place_id) {
      const filter = nearby_places.filter(
        (place) => place.place_id === params.id
      );
      if (filter.length <= 0) {
        getDBPlace();
      } else {
        setDBplace(filter[0]);
      }
    } else {
      setDBplace(selected_place);
    }
  }, [selected_place, nearby_places]);
  return (
    <>
      <section className="mt-[10vh]">
        {/* <div className="aspect-video h-[50vh] w-auto bg-red-400">
          <Image
            src={noImg}
            alt="no image"
            className="object-contain w-1/2 h-auto"
          />
        </div> */}
        <UnderConstruction />
      </section>
    </>
  );
}
