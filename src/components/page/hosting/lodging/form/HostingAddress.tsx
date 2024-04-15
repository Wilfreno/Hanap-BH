import PhilippinesPlacesMenu from "@/components/PhilippinesPlacesMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useState } from "react";
import Map from "@/components/Map";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { setNewLodging } from "@/lib/redux/slice/new-lodging";
import UserMarker from "../../../map/markers/UserMarker";
import { PhilippinesPlaces } from "@/lib/types/psgc-types";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LocationType } from "@/lib/types/user-detail-type";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { MapPinIcon } from "@heroicons/react/24/solid";

export default function HostingAddress({
  setFormIndex,
}: {
  setFormIndex: Dispatch<SetStateAction<number>>;
}) {
  const [street, setStreet] = useState("");
  const [selected_place, setSelectedPlace] = useState<PhilippinesPlaces>();
  const [coordinates, setCoordinates] = useState<LocationType>();
  const dispatch = useDispatch<AppDispatch>();
  const new_lodging = useAppSelector((state) => state.new_lodging_reducer);
  return (
    <div className="flex flex-col w-full h-full space-y-10">
      <h1 className="text-2xl font-bold mx-auto">Address</h1>
      <section className="flex space-x-10 grow">
        <div className="flex flex-col py-10 w-[40%]">
          <PhilippinesPlacesMenu
            selected={(place) => setSelectedPlace(place)}
          />
          <Input
            placeholder="Street"
            className="text-base h-[10dvh] my-auto"
            value={street}
            onChange={(e) => {
              setStreet(e.currentTarget.value);
            }}
          />
        </div>
        <div className="grow relative grid border rounded-lg">
          <AlertDialog>
            <AlertDialogTrigger className="absolute right-2 top-2 z-50 cursor-pointer hover:scale-110">
              <ArrowsPointingOutIcon className="h-6 w-auto dark:text-background" />
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[90vw] h-[90dvh] p-0">
              <AlertDialogCancel className="absolute right-2 top-2 z-50 cursor-pointer hover:scale-110 bg-transparent border-none hover:bg-transparent shadow-none">
                <ArrowsPointingInIcon className="h-6 w-auto dark:text-background" />
              </AlertDialogCancel>
              <Map
                zoom={17}
                className="rounded-lg"
                selected_location={(location) =>
                  setCoordinates({
                    latitude: location?.latitude,
                    longitude: location?.longitude,
                  })
                }
              >
                {coordinates ? (
                  <AdvancedMarker
                    position={{
                      lat: coordinates.latitude!,
                      lng: coordinates.longitude!,
                    }}
                  >
                    <MapPinIcon className="h-7 dark:text-background" />
                  </AdvancedMarker>
                ) : (
                  <UserMarker />
                )}
              </Map>
            </AlertDialogContent>
          </AlertDialog>
          <Map
            zoom={17}
            className="rounded-lg"
            selected_location={(location) =>
              setCoordinates({
                latitude: location?.latitude,
                longitude: location?.longitude,
              })
            }
          >
            {coordinates ? (
              <AdvancedMarker
                position={{
                  lat: coordinates.latitude!,
                  lng: coordinates.longitude!,
                }}
              >
                <MapPinIcon className="h-7 dark:text-background" />
              </AdvancedMarker>
            ) : (
              <UserMarker />
            )}
          </Map>
        </div>
      </section>
      <div className="flex justify-between">
        <Button
          className="text-base font-semibold"
          type="button"
          onClick={() => setFormIndex(0)}
        >
          <ChevronLeftIcon className="h-5 w-auto mr-3" /> Back
        </Button>
        <Button
          className="text-base font-semibold"
          type="button"
          onClick={() => {
           
            // setFormIndex(2);
          }}
          disabled={!street || !selected_place || !coordinates}
        >
          Next <ChevronRightIcon className="h-5 w-auto ml-3" />
        </Button>
      </div>
    </div>
  );
}
