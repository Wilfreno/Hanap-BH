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

export default function BarangayMenu({
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
        `https://psgc.gitlab.io/api/cities-municipalities/${search.municipality_city.code}/barangays.json`
      );
      setList(await r.json());
    }
    if (search.municipality_city.code) getList();
  }, [search.municipality_city.code]);

  return (
    <DropdownMenu onOpenChange={(e) => setOpen(e)}>
      <DropdownMenuTrigger disabled={!search.municipality_city.name}>
        <div
          className={cn(
            "flex items-center justify-center whitespace-nowrap  text-muted-foreground",
            search.municipality_city.name && "text-primary"
          )}
        >
          <p className={cn("text-xs", search.barangay.name && "font-bold")}>
            {search.barangay.name ? search.barangay.name : "Barangay"}
          </p>
          <ArrowIcon
            initial={{ rotate: 0 }}
            animate={open ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
            className="h-5 w-auto"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={22} align="end">
        <ScrollArea className="h-[30svh] ">
          <DropdownMenuGroup className=" space-y-1 w-[20rem]">
            {list
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((l) => (
                <DropdownMenuItem
                  key={l.name}
                  onClick={() => {
                    generate("barangay", l.name);
                    setSearch((prev) => ({ ...prev, barangay: l }));
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
              barangay: { name: "", code: "" },
            }));
            generate("barangay", "");
          }}
        >
          clear
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
