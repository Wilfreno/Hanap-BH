"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import PlaceFilterMenu from "@/components/reusables/PlaceFilterMenu";
import { SearchType } from "@/app/(main)/search/page";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";

export default function Search({
  search,
  setSearch,
  disable,
}: {
  disable?: boolean;
  search?: SearchType;
  setSearch?: Dispatch<SetStateAction<SearchType | undefined>>;
}) {
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
