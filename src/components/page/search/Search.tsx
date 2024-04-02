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
import { HTTPStatusResponseType } from "@/lib/types/http-request-response";
import { LodgingDetailsType, LodgingSearchType } from "@/lib/types/lodging-detail-type";

export default function Search({
  disable,
  result,
  status,
}: {
  disable?: boolean;
  result?: (r: LodgingDetailsType[]) => void;
  status?: (s: HTTPStatusResponseType) => void;
}) {
  const { coordinates } = useCurrentPosition();
  const http_request = useHTTPRequest();

  const [search, setSearch] = useState<LodgingSearchType>();
  const debounced_value = useInputDebounce(search);

  useEffect(() => {
    async function getData() {
      if (
        !debounced_value?.search_value &&
        !debounced_value?.location &&
        !debounced_value?.lodging_type
      ) {
        if (result) result(undefined!);
        return;
      }

      const r = await http_request.post("/api/place/search", {
        ...debounced_value!,
        latitude: coordinates?.lat,
        longitude: coordinates?.lng,
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
          value={search?.search_value ? search.search_value : ""}
          onChange={(e) =>
            setSearch!((prev) => ({ ...prev!, autocomplete: e.target.value }))
          }
        />
        <MagnifyingGlassIcon
          className={cn(
            "h-5 w-auto text-muted",
            search?.search_value && "text-primary"
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
