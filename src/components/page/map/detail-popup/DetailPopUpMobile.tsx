import { PlaceDetailsType } from "@/lib/types/place-detail";
import { useEffect, useState } from "react";
import DetailPopUPCard from "./DetailPopUPCard";
import { useSearchParams } from "next/navigation";
import useSelectedPlaceSession from "@/lib/hooks/useSelectedPlaceSession";
export default function DetailPopUpMobile({
  data,
}: {
  data: PlaceDetailsType[];
}) {
  const [details, setDetails] = useState<PlaceDetailsType>();
  const [on_mobile, setOnMobile] = useState(false);
  const [view, setView] = useState<boolean>(false);

  const search_params = useSearchParams();
  const place_id = search_params.get("place_id");
  const {selected_place} = useSelectedPlaceSession();
  useEffect(() => {
    if (
      /Mobi|Android/i.test(navigator.userAgent) ||
      /iPhone|iPad|iPod/i.test(navigator.userAgent)
    ) {
      setOnMobile(true);
    } else {
      setOnMobile(false);
    }
  }, []);
  useEffect(() => {
    const place_filter = data?.filter((place) => place.place_id === place_id);
    if (place_filter?.length > 0) {
      setDetails(place_filter[0]);
      setView(true);
    }
    if (selected_place?.place_id === place_id) {
      setDetails(selected_place);
      setView(true);
    } else setView(false);
  }, [place_id, data]);
  return view && on_mobile ? <DetailPopUPCard data={details!} /> : null;
}
