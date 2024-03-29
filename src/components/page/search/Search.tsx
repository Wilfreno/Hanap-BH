"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import PlaceFilterMenu from "@/components/reusables/PlaceFilterMenu";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useCurrentPosition from "@/components/hooks/useCurrentPosition";
import useHTTPRequest from "@/components/hooks/useHTTPRequest";
import useInputDebounce from "@/components/hooks/useInputDebounce";
import { PhilippinesPlaces } from "@/lib/types/psgc-types";
import { HTTPStatusResponseType } from "@/lib/types/http-request-response";
import { PlaceDetailsType } from "@/lib/types/place-detail";

export type SearchType = {
  autocomplete: string;
  lodging_type: string;
  location: PhilippinesPlaces;
};

export default function Search({
  disable,
  result,
  status,
}: {
  disable?: boolean;
  result?: (r: PlaceDetailsType[]) => void;
  status?: (s: HTTPStatusResponseType) => void;
}) {
  const { coordinates } = useCurrentPosition();
  const http_request = useHTTPRequest();

  const [search, setSearch] = useState<SearchType>();
  const debounced_value = useInputDebounce(search);

  useEffect(() => {
    async function getData() {
      if (
        !debounced_value?.autocomplete &&
        !debounced_value?.location &&
        !debounced_value?.lodging_type
      ) {
        if (result) result(undefined!);
        return;
      }

      const r = await http_request.post("/api/place/search", {
        ...debounced_value!,
        lat: coordinates?.lat,
        lng: coordinates?.lng,
      });

      if (r.status === "OK" && result) result!(r.data);
      if (status) status(r.status);
    }

    if (search) getData();
  }, [debounced_value]);

  return (
    <form
      autoFocus={false}
      autoComplete="off"
      key="form"
      className="flex items-center self-center justify-self-center w-fit mt-10 border rounded-full px-2 "
    >
      <div className="flex items-center">
        <Input
          disabled={disable}
          placeholder="Search"
          className="border-none focus-visible:ring-0"
          value={search?.autocomplete ? search.autocomplete : ""}
          onChange={(e) =>
            setSearch!((prev) => ({ ...prev!, autocomplete: e.target.value }))
          }
        />
        <MagnifyingGlassIcon
          className={cn(
            "h-5 w-auto text-muted",
            search?.autocomplete && "text-primary"
          )}
        />
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
          <PlaceFilterMenu search={search!} setSearch={setSearch!} />
        </DialogContent>
      </Dialog>
    </form>
  );
}
