import Map from "@/components/reusables/Map";
import Directions from "../map/Directions";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import CarIcon from "@/components/svg/CarIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import DirectionIcon from "@/components/svg/DirectionIcon";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { TabsContent } from "@/components/ui/tabs";
import LocationAccesDenied from "@/components/reusables/LocationAccessDebied";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/solid";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function LodgingMap({
  lodging,
}: {
  lodging: LodgingDetailsType;
}) {
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>();
  const [route_index, setRouteIndex] = useState(0);
  return (
    <TabsContent value="map" className="grid grid-cols-[auto-1fr] my-10">
      <div className="text-base my-5 flex items-center space-x-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="flex items-center">
              <DirectionIcon className="h-6 w-auto stroke-primary stroke-1 mx-3" />
              <Button
                variant="ghost"
                className="space-x-3 rounded-full text-base "
              >
                {routes?.[route_index].summary}{" "}
                <CaretSortIcon className="h-5 w-auto" />
              </Button>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" sideOffset={10}>
            <DropdownMenuGroup>
              {routes?.map((route, index) => (
                <DropdownMenuItem
                  key={route.summary}
                  className=" cursor-pointer"
                  onClick={() => setRouteIndex(index)}
                >
                  {route.summary}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <p className="flex items-center">
          {routes?.[route_index].legs[0]?.distance?.text && (
            <>
              <MapPinIcon className="h-6 w-auto mx-3" />
              {routes?.[route_index].legs[0]?.distance?.text} away
            </>
          )}
        </p>
        <p className="flex items-center space-x-5">
          {routes?.[route_index].legs[0]?.duration?.text && (
            <>
              <CarIcon className="h-8 w-auto stroke-primary mx-3" />
              {routes?.[route_index].legs[0]?.duration?.text}{" "}
            </>
          )}
        </p>
      </div>
      <div className="relative h-[30vw] w-[90vw] rounded-lg overflow-hidden grid border justify-self-center my-5">
        <AlertDialog>
          <AlertDialogTrigger className="absolute top-2 right-2 z-20">
            <ArrowsPointingOutIcon className="h-8 hover:scale-105" />
          </AlertDialogTrigger>
          <AlertDialogContent className="h-screen max-w-[100vw] border-none">
            <AlertDialogCancel className="absolute top-8 right-5 z-20 border-none bg-transaprent shadow-none hover:bg-transparent">
              <ArrowsPointingInIcon className="h-8 hover:scale-105" />
            </AlertDialogCancel>
            <Map
              zoom={16}
              center={{
                latitude: lodging?.latitude,
                longitude: lodging?.longitude,
              }}
              className="rounded-lg"
            >
              <Directions
                destination={{
                  latitude: Number(lodging?.latitude!),
                  longitude: Number(lodging?.longitude!),
                }}
                getRoutes={(r) => setRoutes(r)}
                route_index={route_index}
              />
            </Map>
          </AlertDialogContent>
        </AlertDialog>
        <Map
          zoom={16}
          center={{
            latitude: lodging?.latitude,
            longitude: lodging?.longitude,
          }}
        >
          <Directions
            destination={{
              latitude: Number(lodging?.latitude!),
              longitude: Number(lodging?.longitude!),
            }}
            getRoutes={(r) => setRoutes(r)}
            route_index={route_index}
          />
        </Map>
      </div>
    </TabsContent>
  );
}
