import { PlaceDetailsType } from "@/lib/types/place-detail";
import UserMarker from "./UserMarker";
import PlacesMarker from "./PlacesMarker";
export default function Markers({ places }: { places: PlaceDetailsType[] }) {
  return (
    <>
      <UserMarker />
      <PlacesMarker places={places} />
    </>
  );
}
