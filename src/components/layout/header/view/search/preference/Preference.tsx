import HousingType from "./HousingType";
import Location, { PSGCResponseType } from "./location/Location";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export type PreferenceSearchType = {
  housing_type: string | null;
  province: PSGCResponseType;
  municipality_city: PSGCResponseType;
  barangay: PSGCResponseType;
};

export default function Preference() {
  const searchParams = useSearchParams();
  const housing_type = searchParams.get("housing_type");
  const province = searchParams.get("province");
  const municipality_city = searchParams.get("municipality_city");
  const barangay = searchParams.get("barangay");

  const [search, setSearch] = useState<PreferenceSearchType>({
    housing_type,
    province: {
      name: province!,
      code: "",
    },
    municipality_city: {
      name: municipality_city!,
      code: "",
    },
    barangay: {
      name: barangay!,
      code: "",
    },
  });

  return (
    <>
      <HousingType setSearch={setSearch} search={search} />
      <Separator orientation="vertical" className="h-8 my-3" />
      <Location setSearch={setSearch} search={search} />
      <div className="bg-primary rounded-full">
        <MagnifyingGlassIcon className="h-4 w-auto text-background m-2" />
      </div>
    </>
  );
}
