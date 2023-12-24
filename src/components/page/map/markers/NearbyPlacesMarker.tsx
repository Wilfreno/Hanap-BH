import { PlaceDetailsType } from "@/lib/types/place-detail";
import { HomeIcon } from "@heroicons/react/24/solid";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useRouter } from "next/navigation";

export default function NearbyPlacesMarker({
  datas,
}: {
  datas: PlaceDetailsType[];
}) {
  const router = useRouter();
  return (
    <>
      {datas?.map((data) => (
        <AdvancedMarker
          key={data.place_id}
          position={data.location.coordinates}
          onClick={() => {
            router.push(`/map?place_id=${data.place_id}`);
          }}
          className="cursor-pointer"
        >
          <HomeIcon className="h-12 p-2 text-gray-900 hover:scale-125" />
        </AdvancedMarker>
      ))}
    </>
  );
}
