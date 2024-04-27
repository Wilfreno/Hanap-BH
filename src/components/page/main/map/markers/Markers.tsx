import UserMarker from "./UserMarker";
import PlacesMarker from "./PlacesMarker";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
export default function Markers({ lodgings }: { lodgings: LodgingDetailsType[] }) {
  return (
    <>
      <UserMarker />
      <PlacesMarker lodgings={lodgings} />
    </>
  );
}
