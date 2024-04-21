"use client";

import { DBLodging } from "@/app/(hosting)/hosting/[id]/page";
import Map from "@/components/Map";
import PhilippinesPlacesMenu from "@/components/PhilippinesPlacesMenu";
import UserMarker from "@/components/page/map/markers/UserMarker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setNewLodging } from "@/lib/redux/slice/new-lodging";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { PhilippinesPlaces } from "@/lib/types/psgc-types";
import { LocationType } from "@/lib/types/user-detail-type";
import { cn } from "@/lib/utils";
import { PencilIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function HostingLodgingLocation({
  lodging,
}: {
  lodging: DBLodging
}) {
  const [street, setStreet] = useState(lodging!.location?.street!);
  const [selected_place, setSelectedPlace] = useState<PhilippinesPlaces>();
  const new_lodging = useAppSelector((state) => state.new_lodging_reducer);
  const user_location = useAppSelector((state) => state.user_location_reducer);
  const dispatch = useDispatch<AppDispatch>();

  const [coordinates, setCoordinates] = useState<LocationType>();
  const [coord_edit, setCoordEdit] = useState([false, false]);
  const [show_error, setShowError] = useState(false);

  useEffect(() => {
    function handleSubmit() {
      setShowError(!new_lodging.lodging_type);
    }
    document.addEventListener("submit", handleSubmit);

    return () => document.removeEventListener("submit", handleSubmit);
  }, []);

  useEffect(() => {
    if (selected_place || street) {
      let address = "";

      if (street) address += street + ",";

      if (selected_place?.barangay.name)
        address += selected_place!.barangay.name + ",";

      if (selected_place?.municipality_city.name)
        address += selected_place!.municipality_city.name + ",";

      if (selected_place?.province.name)
        address += selected_place!.province.name;

      dispatch(
        setNewLodging({
          ...new_lodging!,
          location: {
            ...new_lodging?.location!,
            id: lodging!.id,
            address,
            province: selected_place?.province.name!,
            municipality_city: selected_place?.municipality_city.name!,
            barangay: selected_place?.barangay.name!,
            street,
          },
        })
      );
    }
  }, [selected_place, street]);

  useEffect(() => {
    if (coordinates) {
      dispatch(
        setNewLodging({
          ...new_lodging,
          location: {
            ...new_lodging.location,
            latitude: coordinates.latitude!,
            longitude: coordinates.longitude!,
          },
        })
      );
      return;
    }
    dispatch(
      setNewLodging({
        ...new_lodging,
        location: {
          ...new_lodging.location,
          latitude: user_location.latitude!,
          longitude: user_location.longitude!,
        },
      })
    );
    if (user_location.latitude && user_location.longitude)
      setCoordinates(user_location);
  }, [coordinates, user_location]);

  return (
    <div className="space-y-8">
      <Label htmlFor="location" className="text-lg font-bold">
        Location
      </Label>

      <PhilippinesPlacesMenu selected={(e) => setSelectedPlace(e)} />

      <div className="space-y-5 relative">
        <Label htmlFor="street" className="text-base font-bold">
          Street
        </Label>
        <Input
          id="street"
          className={cn(
            "w-2/3 text-base",
            show_error && !street && "border-red-600 focus-visible:ring-red-600"
          )}
          value={street}
          onChange={(e) => setStreet(e.currentTarget.value)}
        />
        {show_error && !new_lodging.location.address && (
          <p className="absolute -bottom-5 left-0 text-red-600 text-xs">
            Provide an address
          </p>
        )}
      </div>
      <section className="space-y-5">
        <div className="space-y-3">
          <Label htmlFor="latitude" className="font-bold text-base">
            Latitude
          </Label>
          <div className="flex space-x-1 ">
            <Input
              type="number"
              autoFocus={coord_edit[0]}
              disabled={!coord_edit[0]}
              id="latitude"
              className="w-1/3"
              value={
                coordinates?.latitude
                  ? coordinates.latitude
                  : user_location.latitude || ""
              }
              onChange={(e) =>
                setCoordinates((prev) => ({
                  ...prev,
                  latitude: Number(e.target.value),
                }))
              }
              onBlur={() => setCoordEdit((prev) => [false, prev[1]])}
            />
            <Button
              className="aspect-square p-2"
              type="button"
              onClick={() => setCoordEdit((prev) => [true, prev[1]])}
            >
              <PencilIcon className="h-6" />
            </Button>
          </div>
        </div>
        <div className="space-y-3">
          <Label htmlFor="longitude" className="font-bold text-base">
            Longitude
          </Label>
          <div className="flex space-x-1">
            <Input
              type="number"
              disabled={!coord_edit[1]}
              id="longitude"
              className="w-1/3"
              value={
                coordinates?.longitude
                  ? coordinates.longitude
                  : user_location.longitude || ""
              }
              onChange={(e) => {
                setCoordinates((prev) => ({
                  ...prev,
                  longitude: Number(e.target.value),
                }));
              }}
              onBlur={() => setCoordEdit((prev) => [prev[0], false])}
            />
            <Button
              className="aspect-square p-2"
              type="button"
              onClick={() => setCoordEdit((prev) => [prev[0], true])}
            >
              <PencilIcon className="h-6" />
            </Button>
          </div>
        </div>
      </section>
      <section className="h-[60dvh] rounded-lg overflow-hidden grid border">
        <Map
          zoom={17}
          selected_location={(e) => setCoordinates(e)}
          map={(map) =>
            map?.panTo({
              lat: coordinates?.latitude!,
              lng: coordinates?.longitude!,
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
      </section>
    </div>
  );
}
