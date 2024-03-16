import dynamic from "next/dynamic";
import Spinner from "../svg/loading/Spinner";
import { LatLngLiteral } from "@/lib/types/google-maps-api-type";
import { APIProvider } from "@vis.gl/react-google-maps";

const GoogleMap = dynamic(() => import("@/components/reusables/GoogleMap"), {
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
}: {
  children?: React.ReactNode;
  selected_location?: (s: LatLngLiteral) => void;
  zoom: number;
  center?: LatLngLiteral;
  className?: string;
}) {
  const api_key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY missing");

  return (
    <APIProvider apiKey={api_key}>
      <GoogleMap
        zoom={zoom}
        center={center}
        className={className}
        selected_location={selected_location}
      >
        {children}
      </GoogleMap>
    </APIProvider>
  );
}
