import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PreferenceSearchType } from "../Preference";
import useSearchParamsGenerator from "@/components/hooks/useSearchParamsGenerator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectSeparator } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { PSGCResponseType } from "./Location";

export default function ProvinceMenu({
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
    async function getProvince() {
      const r = await fetch("https://psgc.gitlab.io/api/provinces.json");
      const l = (await r.json()) as PSGCResponseType[];
      setList(l);
      if (search.province.name) {
        setSearch((prev) => ({
          ...prev,
          province: {
            ...prev.province,
            code: l.filter(
              (location) => location.name === search.province.name
            )[0].code!,
          },
        }));
      }
    }
    getProvince();
  }, []);

  return (
    <DropdownMenu onOpenChange={(e) => setOpen(e)}>
      <DropdownMenuTrigger>
        <div className="flex items-center justify-center whitespace-nowrap">
          <p
            className={cn(
              "text-xs  text-primary",
              search.province.name && "font-bold"
            )}
          >
            {search.province.name ? search.province.name : "Province"}
          </p>
          <ArrowIcon
            initial={{ rotate: 0 }}
            animate={open ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
            className="h-5 w-auto"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={22} align="start">
        <ScrollArea className="h-[30svh]">
          <DropdownMenuGroup className="space-y-1 w-[20rem]">
            {list
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((l) => (
                <DropdownMenuItem
                  key={l.name}
                  onClick={() => {
                    generate("province", l.name);
                    setSearch((prev) => ({ ...prev, province: l }));
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
              province: {
                name: "",
                code: "",
              },
              municipality_city: {
                name: "",
                code: "",
              },
              barangay: {
                name: "",
                code: "",
              },
            }));
            router.push(
              search.housing_type
                ? `${path_name}?view=search&housing_type=${search.housing_type}`
                : `${path_name}?view=search`
            );
          }}
        >
          clear
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
