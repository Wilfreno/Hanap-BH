import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  PSGCResponseType,
  PhilippinesPlaces,
  PhilippinesPlacesList,
} from "@/lib/types/psgc-types";

export default function PhilippinesPlacesMenu({
  selected,
}: {
  selected: (e: PhilippinesPlaces) => void;
}) {
  const [list, setList] = useState<PhilippinesPlacesList>({
    province: [],
    municipality_city: [],
    barangay: [],
  });
  const [open, setOpen] = useState({
    province: false,
    municipality_city: false,
    barangay: false,
  });
  const [place_selected, setPlaceSelected] = useState<PhilippinesPlaces>({
    province: { name: "", code: "" },
    municipality_city: { name: "", code: "" },
    barangay: { name: "", code: "" },
  });

  const ArrowIcon = motion(ChevronRightIcon);

  useEffect(() => {
    async function getProvince() {
      const r = await fetch("https://psgc.gitlab.io/api/provinces.json");
      const l = (await r.json()) as PSGCResponseType[];
      setList((prev) => ({ ...prev, province: l }));
    }
    getProvince();
  }, []);

  useEffect(() => {
    async function getList() {
      const r = await fetch(
        `https://psgc.gitlab.io/api/provinces/${place_selected.province.code}/cities-municipalities.json`
      );
      const l = (await r.json()) as PSGCResponseType[];
      setList((prev) => ({ ...prev, municipality_city: l }));
    }
    if (!place_selected.province.name) {
      setList((prev) => ({ ...prev, municipality_city: [], barangay: [] }));
      return;
    }
    getList();
  }, [place_selected.province]);

  useEffect(() => {
    async function getList() {
      const r = await fetch(
        `https://psgc.gitlab.io/api/cities-municipalities/${place_selected.municipality_city.code}/barangays.json`
      );
      const l = (await r.json()) as PSGCResponseType[];
      setList((prev) => ({ ...prev, barangay: l }));
    }
    if (!place_selected.municipality_city.code) {
      setList((prev) => ({ ...prev, barangay: [] }));
      return
    }
    getList();
  }, [place_selected.municipality_city]);

  useEffect(() => {
    selected(place_selected);
  }, [place_selected]);

  return (
    <section className="space-x-5 flex w-fit h-fit self-center justify-self-center">
      <DropdownMenu
        onOpenChange={(e) => setOpen((prev) => ({ ...prev, province: e }))}
      >
        <DropdownMenuTrigger asChild>
          <Button className={cn("rounded-full focus-visible:ring-0")}>
            {place_selected.province.name ? (
              <p className="font-bold">{place_selected.province.name}</p>
            ) : (
              "Province"
            )}
            <ArrowIcon
              initial={{ rotate: 0 }}
              animate={open.province ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
              className="h-4 w-auto ml-3"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <ScrollArea className="h-[40dvh]">
            <DropdownMenuGroup>
              {list.province
                ?.sort((a, b) => a.name.localeCompare(b.name))
                .map((province) => (
                  <DropdownMenuItem
                    key={province.name}
                    className=" cursor-pointer"
                    onClick={() =>
                      setPlaceSelected((prev) => ({
                        ...prev,
                        province: {
                          name: province.name,
                          code: province.code,
                        },
                      }))
                    }
                  >
                    {province.name}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuGroup>
          </ScrollArea>
          <DropdownMenuItem
            onClick={() =>
              setPlaceSelected({
                province: { name: "", code: "" },
                municipality_city: { name: "", code: "" },
                barangay: { name: "", code: "" },
              })
            }
          >
            <p className="mx-auto font-bold cursor-pointer">clear</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu
        onOpenChange={(e) =>
          setOpen((prev) => ({ ...prev, municipality_city: e }))
        }
      >
        <DropdownMenuTrigger disabled={!place_selected.province.code} asChild>
          <Button
            className={cn(
              "rounded-full focus-visible:ring-0",
              !place_selected.province.code && "text-muted-foreground"
            )}
          >
            {place_selected.municipality_city.name ? (
              <p className="font-bold">
                {place_selected.municipality_city.name}
              </p>
            ) : (
              "Municipality / City"
            )}
            <ArrowIcon
              initial={{ rotate: 0 }}
              animate={open.municipality_city ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
              className="h-4 w-auto ml-3"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <ScrollArea
            className={cn(
              "h-[40dvh]",
              list.municipality_city.length < 8 && "h-fit"
            )}
          >
            <DropdownMenuGroup>
              {list.municipality_city?.map((municipality_city) => (
                <DropdownMenuItem
                  key={municipality_city.name}
                  className=" cursor-pointer"
                  onClick={() =>
                    setPlaceSelected((prev) => ({
                      ...prev,
                      municipality_city: {
                        name: municipality_city.name,
                        code: municipality_city.code,
                      },
                    }))
                  }
                >
                  {municipality_city.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </ScrollArea>
          <DropdownMenuItem
            onClick={() =>
              setPlaceSelected((prev) => ({
                ...prev,
                municipality_city: { name: "", code: "" },
                barangay: { name: "", code: "" },
              }))
            }
          >
            <p className="mx-auto font-bold cursor-pointer">clear</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu
        onOpenChange={(e) => setOpen((prev) => ({ ...prev, barangay: e }))}
      >
        <DropdownMenuTrigger
          disabled={!place_selected.municipality_city.name}
          asChild
        >
          <Button
            className={cn(
              "rounded-full focus-visible:ring-0",
              !place_selected.municipality_city.code && "text-muted-foreground"
            )}
          >
            {place_selected.barangay.name ? (
              <p className="font-bold">{place_selected.barangay.name}</p>
            ) : (
              "Barangay"
            )}
            <ArrowIcon
              initial={{ rotate: 0 }}
              animate={open.barangay ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
              className="h-4 w-auto ml-3"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <ScrollArea
            className={cn("h-[40dvh]", list.barangay.length < 8 && "h-fit")}
          >
            <DropdownMenuGroup>
              {list.barangay.map((barangay) => (
                <DropdownMenuItem
                  key={barangay.name}
                  className=" cursor-pointer"
                  onClick={() =>
                    setPlaceSelected((prev) => ({
                      ...prev,
                      barangay: {
                        name: barangay.name,
                        code: barangay.code,
                      },
                    }))
                  }
                >
                  {barangay.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </ScrollArea>
          <DropdownMenuItem
            onClick={() =>
              setPlaceSelected((prev) => ({
                ...prev,
                barangay: { name: "", code: "" },
              }))
            }
          >
            <p className="mx-auto font-bold cursor-pointer">clear</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
