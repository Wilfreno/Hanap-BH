import { APIProvider, AdvancedMarker } from "@vis.gl/react-google-maps";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import loadingSVG from "../../../../../../public/icons/loading-transparent.svg";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  MapPinIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { LatLngLiteral } from "@/lib/types/google-maps-api-type";
import { FormState } from "./PlaceDetailHosting";
const Map = dynamic(() => import("@/components/reusables/ReusableMap"), {
  loading: () => (
    <section className="h-screen w-screen flex items-center justify-center bg-gray-500">
      <Image
        src={loadingSVG}
        alt="Loading..."
        className="h-50 w-auto"
        priority
      />
    </section>
  ),
});
export default function HostinMap({
  setForm,
}: {
  setForm: Dispatch<SetStateAction<FormState>>;
}) {
  const [selected_location, setSelectedLocation] = useState<LatLngLiteral>();
  const [icon_toggle, setToggle] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const api_key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY missing");

  useEffect(() => {
    setForm((prev) => {
      return {
        ...prev,
        location: {
          ...prev.location,
          coordinates: {
            lat: selected_location?.lat!,
            lng: selected_location?.lng!,
          },
        },
      };
    });
  }, [selected_location]);
  return (
    <div
      className={` aspect-video cursor-pointer text-gray-900 border border-gray-300 rounded-lg shadow-lg
        ${
          fullscreen
            ? "fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[90vw] h-[95vh]"
            : "relative h-[60vh] w-auto my-10"
        }`}
    >
      <APIProvider apiKey={api_key}>
        <Map
          style="rounded-lg cursor-pointer"
          setSelectedLocation={setSelectedLocation}
        >
          {selected_location ? (
            <AdvancedMarker
              position={selected_location}
              onClick={() => setSelectedLocation(undefined)}
            >
              <div
                onMouseEnter={() => {
                  setToggle(true);
                }}
                onMouseLeave={() => setToggle(false)}
              >
                {icon_toggle ? (
                  <XMarkIcon className="h-8" />
                ) : (
                  <MapPinIcon className="h-8 animate-bounce" />
                )}
              </div>
            </AdvancedMarker>
          ) : null}
        </Map>
      </APIProvider>
      {fullscreen ? (
        <ArrowsPointingInIcon
          className="absolute top-2 right-2 h-7 hover:scale-125"
          onClick={() => setFullscreen((prev) => !prev)}
        />
      ) : (
        <ArrowsPointingOutIcon
          className=" absolute top-2 right-2 h-7 hover:scale-125"
          onClick={() => setFullscreen((prev) => !prev)}
        />
      )}
    </div>
  );
}
