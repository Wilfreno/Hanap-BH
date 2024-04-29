"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import PlaceFilterMenu from "@/components/PlaceFilterMenu";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import UseHTTPRequest from "@/components/hooks/useHTTPRequest";
import UseInputDebounce from "@/components/hooks/useInputDebounce";
import {
  LodgingDetailsType,
  LodgingSearchType,
} from "@/lib/types/lodging-detail-type";
import { APIStatusResponseType } from "@/lib/types/api-request-response";
import { useAppSelector } from "@/lib/redux/store";

export default function Search({
  disable,
  result,
  status,
}: {
  disable?: boolean;
  result?: (r: LodgingDetailsType[]) => void;
  status?: (s: APIStatusResponseType) => void;
}) {
  const http_request = UseHTTPRequest();
  const user_location = useAppSelector((state) => state.user_location_reducer);
  const [search, setSearch] = useState<LodgingSearchType>({
    latitude: user_location?.latitude!,
    longitude: user_location.longitude,
    location: {
      barangay: { code: "", name: "" },
      municipality_city: { code: "", name: "" },
      province: { code: "", name: "" },
    },
    lodging_type: "",
    search_value: "",
  });

  return (
    <form
      autoFocus={false}
      autoComplete="off"
      key="form"
      className="flex items-center self-center justify-self-center w-[30rem] my-10 border rounded-full px-2"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!search.search_value && !search.location && !search.lodging_type) {
          if (result) result(undefined!);
          return;
        }

        const r = await http_request.post("/api/place/search", {
          ...search,
        });

        if (r.status === "OK" && result)
          result!(r.data as LodgingDetailsType[]);
        if (status) status(r.status);
      }}
    >
      <div className="flex items-center grow text-base ">
        <Input
          disabled={disable}
          placeholder="Search"
          className="border-none focus-visible:ring-0"
          value={search.search_value}
          onChange={(e) =>
            setSearch((prev) => ({ ...prev!, search_value: e.target.value }))
          }
        />

        {search.search_value && (
          <XMarkIcon
            className="h-6 w-auto hover:stroke-2 mx-2 cursor-pointer"
            onClick={() => setSearch((prev) => ({ ...prev, search_value: "" }))}
          />
        )}
        <Button
          disabled={!search.search_value}
          size="icon"
          variant="ghost"
          className="aspect-square h-fit rounded-full p-1"
          type="submit"
        >
          <MagnifyingGlassIcon className="h-5 w-auto stroke-2" />
        </Button>
      </div>
      <Dialog>
        <DialogTrigger asChild disabled={disable}>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full m-1 hover:border"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-auto" />
          </Button>
        </DialogTrigger>
        <DialogContent className="space-y-5 grid">
          <PlaceFilterMenu search={search!} setSearch={setSearch} />
        </DialogContent>
      </Dialog>
    </form>
  );
}
