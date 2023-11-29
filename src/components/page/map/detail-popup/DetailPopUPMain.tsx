import { PlaceDetailsType } from "@/lib/types/place-detail";
import DetailPopUPCard from "./DetailPopUPCard";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMap } from "@vis.gl/react-google-maps";
export default function DetailPopUPMain({
  data,
  on_mobile,
}: {
  data: PlaceDetailsType;
  on_mobile: boolean;
}) {
  const map = useMap();
  const svg_ref = useRef<SVGSVGElement>(null);
  const search_params = useSearchParams();
  const place_id = search_params.get("place_id");
  const router = useRouter();

  if (data && place_id !== "" && data.place_id === place_id) {
    map?.panTo({
      lat: data.location.coordinates.lat + 0.0013,
      lng: data.location.coordinates.lng,
    });
    if (!on_mobile) {
      map?.setZoom(18);
    }
  }
  return (
    <>
      {!on_mobile && place_id === data.place_id ? (
        <DetailPopUPCard data={data} />
      ) : null}
      <HomeIcon
        ref={svg_ref}
        onClick={() => {
          router.push(`/map?place_id=${data.place_id}`);
        }}
        className="h-12 p-2 text-gray-900 hover:scale-125"
      />
    </>
  );
}
