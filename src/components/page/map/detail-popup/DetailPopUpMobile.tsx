import { useAppSelector } from "@/lib/redux/store";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import { useEffect, useState } from "react";
import DetailPopUPCard from "./DetailPopUPCard";
import { useSearchParams } from "next/navigation";
export default function DetailPopUpMobile({
  data,
}: {
  data: PlaceDetailsType[];
}) {
  const place_detail = useAppSelector((state) => state.selected_detail_reducer);
  const [details, setDetails] = useState<PlaceDetailsType>(place_detail);
  const [on_mobile, setOnMobile] = useState(false);

  const search_params = useSearchParams();
  const place_id = search_params.get("place_id");
  const [view, setView] = useState<boolean>(false);

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
    if (place_id && place_detail.place_id === "" && data?.length > 0) {
      const place_filter = data.filter((place) => place.place_id === place_id);
      setDetails(place_filter[0]);
      setView(true);
    } else if (place_detail.place_id === place_id) {
      setDetails(place_detail);
      setView(true);
    } else setView(false);
  }, [place_detail.place_id, place_id, data]);
  return view && on_mobile ? <DetailPopUPCard data={details} /> : null;
}
