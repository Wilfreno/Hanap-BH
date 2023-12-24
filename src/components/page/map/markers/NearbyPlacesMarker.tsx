import { PlaceDetailsType } from "@/lib/types/place-detail";
import { HomeIcon } from "@heroicons/react/24/solid";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useRouter, useSearchParams } from "next/navigation";

export default function NearbyPlacesMarker({
  datas,
}: {
  datas: PlaceDetailsType[];
}) {
  const search_params = useSearchParams();
  const place_id = search_params.get("place_id");
  const map = useMap();
  const router = useRouter();
  if (!place_id) map?.setZoom(17);
  return (
    <>
      {datas?.map((data) => (
        <AdvancedMarker
          key={data.place_id}
          position={data.location.coordinates}
          onClick={() => {
            router.push(`/map?place_id=${data.place_id}`);
          }}
        >
          <HomeIcon className="h-8 hover:scale-125" />
        </AdvancedMarker>
      ))}
    </>
  );
}
