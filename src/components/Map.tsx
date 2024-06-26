import dynamic from "next/dynamic";
import Spinner from "./svg/loading/Spinner";
import { APIProvider } from "@vis.gl/react-google-maps";
import { LocationType } from "@/lib/types/user-detail-type";
import LocationAccesDenied from "./LocationAccessDenied";

const GoogleMap = dynamic(() => import("@/components/GoogleMap"), {
  loading: () => (
    <Spinner className="w-[10vw] h-auto self-center justify-self-center fill-primary" />
  ),
});

export default function Map({
  className,
  zoom,
  center,
  selected_location,
  children,
  map,
}: {
  children?: React.ReactNode;
  selected_location?: (s: LocationType) => void;
  zoom: number;
  center?: LocationType;
  className?: string;
  map?: (m: google.maps.Map) => void;
}) {
  const api_key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY missing");
  return (
    <LocationAccesDenied>
      <APIProvider apiKey={api_key}>
        <GoogleMap
          zoom={zoom}
          center={center}
          className={className}
          selected_location={selected_location}
          map={map}
        >
          {children}
        </GoogleMap>
      </APIProvider>
    </LocationAccesDenied>
  );
}
