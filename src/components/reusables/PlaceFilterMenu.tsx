import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import LodgingTypes from "./LodgingTypes";
import PhilippinesPlacesMenu from "./PhilippinesPlacesMenu";
import { Dispatch, SetStateAction, useState } from "react";
import { PhilippinesPlaces } from "@/lib/types/psgc-types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SearchType } from "../page/search/Search";

export default function PlaceFilterMenu({
  search,
  setSearch,
}: {
  search: SearchType;
  setSearch: Dispatch<SetStateAction<SearchType | undefined>>;
}) {
  const [location, setLocation] = useState<PhilippinesPlaces>();
  const [lodging_type, setLodgingType] = useState<string>();
  const lodging_types = LodgingTypes();

  return (
    <>
      <div className="space-y-5">
        <h1 className="text-xl font-bold">Lodging Type</h1>
        <RadioGroup
          defaultValue={search?.lodging_type}
          className="flex flex-wrap"
          onValueChange={(e) => setLodgingType(e)}
        >
          {lodging_types.map((lodging) => (
            <div
              key={lodging.name}
              className="flex space-x-1 items-center mx-2"
            >
              <RadioGroupItem id={lodging.link} value={lodging.link} />
              <Label htmlFor={lodging.link} className="text-base">
                {lodging.name}
              </Label>
            </div>
          ))}
          <div className="flex space-x-1 items-center mx-2">
            <RadioGroupItem id="all" value="" />
            <Label htmlFor="all" className="text-base">
              All
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="grid space-y-5">
        <h1 className="text-xl font-bold">Location</h1>
        <PhilippinesPlacesMenu selected={(e) => setLocation(e)} />
      </div>
      <DialogClose
        className="justify-self-end"
        onClick={() =>
          setSearch((prev) => ({
            ...prev!,
            location: location!,
            lodging_type: lodging_type!,
          }))
        }
        asChild
      >
        <Button className="font-semibold" disabled={!lodging_type && !location}>
          search
          <MagnifyingGlassIcon className="h-4 w-auto rotate-90 mx-1" />
        </Button>
      </DialogClose>
    </>
  );
}
