"use client";
import { setSelectedDetail } from "@/lib/redux/slices/selected-detail-slice";
import { AppDispatch } from "@/lib/redux/store";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DetailPopUPMain from "../detail-popup/DetailPopUPMain";

export default function SearchMarker({ data }: { data: PlaceDetailsType }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [on_mobile, setOnMobile] = useState(false);

  useEffect(() => {
    if (
      /Mobi|Android/i.test(navigator.userAgent) ||
      /iPhone|iPad|iPod/i.test(navigator.userAgent)
    ) {
      setOnMobile(true);
    } else {
      setOnMobile(false);
    }
  }, [navigator.userAgent]);

  useEffect(() => {
    dispatch(setSelectedDetail(data));
  }, [data]);
  return data ? (
    <AdvancedMarker
      key={data.place_id}
      position={data.location.coordinates}
      className="cursor-pointer"
    >
      <DetailPopUPMain key={data.place_id} data={data} on_mobile={on_mobile} />
    </AdvancedMarker>
  ) : null;
}
