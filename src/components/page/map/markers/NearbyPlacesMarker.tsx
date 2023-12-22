import { PlaceDetailsType } from "@/lib/types/place-detail";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import DetailPopUPMain from "../detail-popup/DetailPopUPMain";
import { useEffect, useState } from "react";

export default function NearbyPlacesMarker({
  datas,
}: {
  datas: PlaceDetailsType[];
}) {
  const map = useMap()
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

  return (
    <>
      {datas?.map((data) => (
        <AdvancedMarker
          key={data.place_id}
          position={data.location.coordinates}
          onClick={() => {}}
          className="cursor-pointer"
        >
          <DetailPopUPMain data={data} on_mobile={on_mobile} />
        </AdvancedMarker>
      ))}
    </>
  );
}
