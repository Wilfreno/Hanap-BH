import useSearchParamsGenerator from "@/components/hooks/useSearchParamsGenerator";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PreferenceSearchType } from "./Preference";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import LodgingTypes from "@/components/reusables/LodgingTypes";
import { Button } from "@/components/ui/button";

export default function HousingType({
  setSearch,
  search,
}: {
  search: PreferenceSearchType;
  setSearch: Dispatch<SetStateAction<PreferenceSearchType>>;
}) {
  const [open, setOPen] = useState(false);
  const { generate } = useSearchParamsGenerator();
  const lodging_type = LodgingTypes();
  const ArrowIcon = motion(ChevronRightIcon);
  return (
    <DropdownMenu onOpenChange={(e) => setOPen(e)}>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn("rounded-full focus-visible:ring-0 text-base")}
          variant={search.lodging_type ? "secondary" : "ghost"}
        >
          <p>{search.lodging_type ? search.lodging_type : "Lodging Type"}</p>

          <ArrowIcon
            initial={{ rotate: 0 }}
            animate={open ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
            className="h-5 w-auto"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={22}>
        <DropdownMenuGroup className=" space-y-1 p-2">
          {lodging_type.map((lodging) => (
            <DropdownMenuItem
              key={lodging.name}
              className="cursor-pointer py-2"
              onClick={() => {
                setSearch((prev) => ({ ...prev, lodging_type: lodging.name }));
                generate("lodging_type", lodging.name);
              }}
            >
              {lodging.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-base flex items-center justify-center font-semibold"
          onClick={() => {
            setSearch((prev) => ({ ...prev, lodging_type: "" }));
            generate("lodging_type", "");
          }}
        >
          clear
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
