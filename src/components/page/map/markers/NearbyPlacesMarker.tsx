import useNearbyPlacesAPI from "@/components/hooks/useNearbyPlacesAPI";
import { HomeIcon } from "@heroicons/react/24/outline";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useRouter, useSearchParams } from "next/navigation";

export default function NearbyPlacesMarker() {
  const { nearby_place } = useNearbyPlacesAPI();
  const map = useMap();
  const router = useRouter();

  return (
    <>
      {nearby_place?.map((data) => (
        <AdvancedMarker
          key={data.place_id}
          position={{
            lat: data.location.coordinates.lat,
            lng: data.location.coordinates.lng,
          }}
          onClick={() => {
            router.push(`/map?place_id=${data.place_id}`);
            map?.panTo(data.location.coordinates);
          }}
        >
          <HomeIcon className="h-8 hover:scale-125 dark:text-background" />
        </AdvancedMarker>
      ))}
    </>
  );
}
