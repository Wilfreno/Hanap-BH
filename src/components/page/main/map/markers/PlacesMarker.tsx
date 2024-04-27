import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HomeIcon } from "@heroicons/react/24/outline";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import CustomImage from "@/components/CustomImage";
import LodgingGoogleMessage from "../../../lodging/LodgingGoogleMessage";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";

export default function PlacesMarker({
  lodgings,
}: {
  lodgings: LodgingDetailsType[];
}) {
  const map = useMap();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lodging_id = searchParams.get("lodging_id");

  useEffect(() => {
    const lodging = lodgings.filter((p) => p.id === lodging_id);
    if (lodging.length > 0)
      map?.panTo({
        lat: Number(lodging[0].location.latitude),
        lng: Number(lodging[0].location.latitude),
      });
  }, [lodgings]);

  return (
    <>
      {lodgings?.map((lodging) => (
        <AdvancedMarker
          key={lodging.id}
          position={{
            lat: Number(lodging.location.latitude),
            lng: Number(lodging.location.longitude),
          }}
          onClick={() => {
            router.replace(`/map?lodging_id=${lodging.id}`);
            map?.panTo({
              lat: Number(lodging.location.latitude),
              lng: Number(lodging.location.longitude),
            });
          }}
        >
          <Sheet
            onOpenChange={() => router.replace("/map")}
            open={lodging_id === lodging.id}
          >
            <SheetTrigger>
              <HomeIcon className="h-8 hover:scale-125 dark:text-background" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="my-5">
                <div className=" aspect-square w-full h-auto rounded-lg overflow-hidden">
                  <CustomImage
                    database={lodging.database}
                    url={lodging.photos?.[0].photo_url}
                  />
                </div>
              </SheetHeader>
              <h1 className="text-lg font-semibold">{lodging.name}</h1>
              <p className="text-sm text-muted-foreground">
                {lodging.location.address}
              </p>
              <div className="my-5">
                <p>{lodging.distance!.toFixed(2)} km away</p>
              </div>
              {lodging.database === "GOOGLE" && (
                <LodgingGoogleMessage lodging={lodging} className="text-xs" />
              )}
            </SheetContent>
          </Sheet>
        </AdvancedMarker>
      ))}
    </>
  );
}
