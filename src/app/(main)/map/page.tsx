"use client";
import Spinner from "@/components/svg/loading/Spinner";
import { APIProvider } from "@vis.gl/react-google-maps";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/reusables/ReusableMap"), {
  loading: () => <Spinner className="h-20 self-center justify-self-center" />,
});
export default function page() {
  const api_key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY missing");

  return (
    <>
      <APIProvider apiKey={api_key}>
        <Map zoom={17} />
      </APIProvider>
    </>
  );
}
