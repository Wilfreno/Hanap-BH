import { PlaceDetailsType } from "@/lib/types/google-places-api-type";
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
