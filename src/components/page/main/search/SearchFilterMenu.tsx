"use client";
import { Button } from "../../../ui/button";
import { DialogClose } from "../../../ui/dialog";
import { Label } from "../../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";
import LodgingTypes from "../../../LodgingTypes";
import PhilippinesPlacesMenu from "../../../PhilippinesPlacesMenu";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PhilippinesPlaces } from "@/lib/types/psgc-types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { LodgingSearchType } from "@/lib/types/lodging-detail-type";

export default function SearchFilterMenu({
  search,
  setSearch,
}: {
  search: LodgingSearchType;
  setSearch: Dispatch<SetStateAction<LodgingSearchType>>;
}) {
  const lodging_types = LodgingTypes();

  return (
    <>
      <div className="space-y-5">
        <h1 className="text-xl font-bold">Lodging Type</h1>
        <RadioGroup
          defaultValue={search?.lodging_type}
          className="flex flex-wrap"
          onValueChange={(e) =>
            setSearch((prev) => ({ ...prev, lodging_type: e }))
          }
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
        <PhilippinesPlacesMenu
          selected={(e) => {
            setSearch((prev) => ({ ...prev, location: e }));
          }}
        />
      </div>
      <DialogClose className="justify-self-end" asChild>
        <Button
          className="font-semibold"
          disabled={
            !search.lodging_type &&
            !search.location.province.name &&
            !search.location.municipality_city.name &&
            !search.location.barangay.name
          }
          type="submit"
        >
          search
          <MagnifyingGlassIcon className="h-4 w-auto rotate-90 mx-1" />
        </Button>
      </DialogClose>
    </>
  );
}
