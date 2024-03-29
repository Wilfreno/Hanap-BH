import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import { HomeIcon } from "@heroicons/react/24/outline";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import MainContentCard from "../../main/MainContentCard";
import PlaceImage from "@/components/reusables/PlaceImage";
import LodgingGoogleMessage from "../../lodging/LodgingGoogleMessage";

export default function PlacesMarker({
  places,
}: {
  places: PlaceDetailsType[];
}) {
  const map = useMap();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const place_id = searchParams.get("place_id");
    const filter = places.filter((p) => p.place_id === place_id);
    if (filter.length > 0) map?.panTo(filter[0].location.coordinates);
  }, [places]);

  return (
    <>
      {places?.map((place) => (
        <AdvancedMarker
          key={place.place_id}
          position={{
            lat: place.location.coordinates.lat,
            lng: place.location.coordinates.lng,
          }}
          onClick={() => {
            router.push(`/map?place_id=${place.place_id}`);
            map?.panTo(place.location.coordinates);
          }}
        >
          <Sheet>
            <SheetTrigger>
              <HomeIcon className="h-8 hover:scale-125 dark:text-background" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="my-5">
                <div className=" aspect-square w-full h-auto rounded-lg overflow-hidden">
                  <PlaceImage photo={place.photos[0]} />
                </div>
              </SheetHeader>
              <h1 className="text-lg font-semibold">{place.name}</h1>
              <p className="text-sm text-muted-foreground">
                {place.location.vicinity}
              </p>
              <div className="my-5">
                <p>{place.distance.toFixed(2)} km away</p>
              </div>
              {place.database === "GOOGLE" && (
                <LodgingGoogleMessage place={place} className="text-xs" />
              )}
            </SheetContent>
          </Sheet>
        </AdvancedMarker>
      ))}
    </>
  );
}
