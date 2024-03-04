import { APIProvider } from "@vis.gl/react-google-maps";
import NearbyPlacesMarker from "./markers/NearbyPlacesMarker";
import UserMarker from "./markers/UserMarker";
import dynamic from "next/dynamic";
import Spinner from "@/components/svg/loading/Spinner";

const GoogleMap = dynamic(() => import("@/components/reusables/ReusableMap"), {
  loading: () => <Spinner className="h-20 w-auto fill-primary mx-auto" />,
});

export default function Map() {
  const api_key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY missing");

  return (
    <APIProvider apiKey={api_key}>
      <GoogleMap zoom={16}>
        <NearbyPlacesMarker />
        <UserMarker />
      </GoogleMap>
    </APIProvider>
  );
}
