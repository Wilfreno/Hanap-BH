import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PreferenceSearchType } from "../Preference";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useSearchParamsGenerator from "@/components/hooks/useSearchParamsGenerator";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectSeparator } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { PSGCResponseType } from "./Location";

export default function MunicipalityCityMenu({
  search,
  setSearch,
}: {
  search: PreferenceSearchType;
  setSearch: Dispatch<SetStateAction<PreferenceSearchType>>;
}) {
  const [list, setList] = useState<PSGCResponseType[]>();
  const [open, setOpen] = useState(false);
  const { generate } = useSearchParamsGenerator();
  const router = useRouter();
  const path_name = usePathname();
  const ArrowIcon = motion(ChevronRightIcon);

  useEffect(() => {
    async function getList() {
      const r = await fetch(
        `https://psgc.gitlab.io/api/provinces/${search.province.code}/cities-municipalities.json`
      );
      const l = (await r.json()) as PSGCResponseType[];
      setList(l);
      if (search.municipality_city.name) {
        setSearch((prev) => ({
          ...prev,
          municipality_city: {
            ...prev.municipality_city,
            code: l.filter(
              (location) => location.name === search.municipality_city.name
            )[0].code,
          },
        }));
      }
    }
    if (search.province.code) getList();
  }, [search.province.code]);

  return (
    <DropdownMenu onOpenChange={(e) => setOpen(e)}>
      <DropdownMenuTrigger disabled={!search.province.code}>
        <div
          className={cn(
            "flex items-center justify-center whitespace-nowrap  text-muted-foreground",
            search.province.name && "text-primary"
          )}
        >
          <p
            className={cn(
              "text-xs",
              search.municipality_city.name && "font-bold"
            )}
          >
            {search.municipality_city.name
              ? search.municipality_city.name
              : "Municipality / City"}
          </p>
          <ArrowIcon
            initial={{ rotate: 0 }}
            animate={open ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
            className="h-5 w-auto"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={22}>
        <ScrollArea className="h-[30svh]">
          <DropdownMenuGroup className="space-y-1 w-[20rem] ">
            {list
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((l) => (
                <DropdownMenuItem
                  key={l.name}
                  onClick={() => {
                    generate("municipality_city", l.name);
                    setSearch((prev) => ({ ...prev, municipality_city: l }));
                  }}
                  className="cursor-pointer py-2"
                >
                  {l.name}
                </DropdownMenuItem>
              ))}
          </DropdownMenuGroup>
        </ScrollArea>
        <SelectSeparator />
        <DropdownMenuItem
          className="text-sm cursor-pointer flex items-center justify-center font-bold"
          onClick={() => {
            setSearch((prev) => ({
              ...prev,
              municipality_city: { name: "", code: "" },
              barangay: {
                name: "",
                code: "",
              },
            }));

            router.push(
              search.housing_type
                ? `${path_name}?view=search&housing_type=${search.housing_type}&province=${search.province.name}`
                : `${path_name}?view=search&province=${search.province.name}`
            );
          }}
        >
          clear
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
