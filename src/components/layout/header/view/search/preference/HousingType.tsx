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
import { housing_type } from "@/components/page/main/filter/HouseTypeFIiter";

export default function HousingType({
  setSearch,
  search,
}: {
  search: PreferenceSearchType;
  setSearch: Dispatch<SetStateAction<PreferenceSearchType>>;
}) {
  const [open, setOPen] = useState(false);
  const { generate } = useSearchParamsGenerator();

  const ArrowIcon = motion(ChevronRightIcon);
  return (
    <DropdownMenu onOpenChange={(e) => setOPen(e)}>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            "flex items-center space-x-3 text-base text-muted-foreground font-semibold cursor-pointer whitespace-nowrap ",
            search.housing_type && "font-bold text-primary"
          )}
        >
          <p>{search.housing_type ? search.housing_type : "Housing Type"}</p>

          <ArrowIcon
            initial={{ rotate: 0 }}
            animate={open ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
            className="h-5 w-auto"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={22}>
        <DropdownMenuGroup className=" space-y-1 p-2">
          {housing_type.map((housing) => (
            <DropdownMenuItem
              key={housing}
              className="cursor-pointer py-2"
              onClick={() => {
                setSearch((prev) => ({ ...prev, housing_type: housing }));
                generate("housing_type", housing);
              }}
            >
              {housing}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-base flex items-center justify-center font-semibold"
          onClick={() => {
            setSearch((prev) => ({ ...prev, housing_type: "" }));
            generate("housing_type", "");
          }}
        >
          clear
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
