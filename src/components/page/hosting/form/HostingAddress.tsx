import PhilippinesPlacesMenu from "@/components/reusables/PhilippinesPlacesMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { APIProvider, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useState } from "react";
import UserMarker from "../../map/markers/UserMarker";
import { cn } from "@/lib/utils";
import { LatLngLiteral } from "@/lib/types/google-maps-api-type";
import { usePathname, useRouter } from "next/navigation";
import Map from "@/components/reusables/Map";

export default function HostingAddress() {
  const api_key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY missing");

  const [selected, setSelected] = useState<any>();
  const [fullscreen, setFullSreen] = useState(false);
  const [coordinates, setCoordinates] = useState<LatLngLiteral>();
  const router = useRouter();
  const path_name = usePathname();

  return (
    <div className="flex flex-col w-full h-full space-y-10">
      <h1 className="text-2xl font-bold mx-auto">Address</h1>
      <div className="space-y-10 mx-auto">
        <PhilippinesPlacesMenu selected={(s) => setSelected(s)} />
        <Input placeholder="Street" className="text-base" />
      </div>
      <div
        className={cn(
          "w-full h-full flex border rounded-lg bg-muted relative",
          fullscreen &&
            "fixed aspect-video h-[80svh] w-auto top-0 left-1/2 -translate-x-1/2 z-50"
        )}
      >
        <i
          className="absolute right-2 top-2 dark:text-background z-50 h-6 w-auto cursor-pointer hover:scale-110"
          onClick={() => setFullSreen((prev) => !prev)}
        >
          {fullscreen ? (
            <ArrowsPointingInIcon className="h-full w-auto" />
          ) : (
            <ArrowsPointingOutIcon className="h-full w-auto" />
          )}
        </i>
        <APIProvider apiKey={api_key}>
          <Map
            zoom={18}
            className="rounded-lg cursor-pointer"
            selected_location={(e) => setCoordinates(e)}
          >
            {coordinates ? (
              <AdvancedMarker position={coordinates}>
                <MapPinIcon className="h-7 dark:text-background animate-bounce" />
              </AdvancedMarker>
            ) : (
              <UserMarker />
            )}
          </Map>
        </APIProvider>
      </div>
      <div className="flex justify-between">
        <Button
          className="text-base font-semibold"
          type="button"
          onClick={() => router.replace(`${path_name}?form=name`)}
        >
          <ChevronLeftIcon className="h-5 w-auto mr-3" /> Back
        </Button>
        <Button className="text-base font-semibold" type="button">
          Next <ChevronRightIcon className="h-5 w-auto ml-3" />
        </Button>
      </div>
    </div>
  );
}
