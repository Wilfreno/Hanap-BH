import { LatLngLiteral, MapType } from "@/lib/types/google-map-type";
import AdvanceMarker from "./AdvanceMarker";
import BoySharpIcon from "@mui/icons-material/BoySharp";
export default function UserMarker({
  user_location,
  map,
}: {
  user_location: LatLngLiteral;
  map: MapType;
}) {
  return (
    <>
      <AdvanceMarker map={map} position={user_location}>
        <BoySharpIcon />
      </AdvanceMarker>
    </>
  );
}
