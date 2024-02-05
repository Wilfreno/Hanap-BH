"use client";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import useInputDebounce from "@/components/hooks/useInputDebounce";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SearchResult from "./SearchResult";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import useHTTPRequest from "@/components/hooks/useHTTPRequest";

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const [results, setResults] = useState<PlaceDetailsType[]>();
  const debouncedValue = useInputDebounce(search, 300);
  const http_request = useHTTPRequest();
  useEffect(() => {
    async function getSearch() {
      try {
        setLoading(true);
        const response = await http_request.get(
          `/api/autocomplete?search=${debouncedValue}`
        );
        setResults(response.data);
        setLoading(false);
      } catch (error) {
        throw error;
      }
    }

    if (debouncedValue === "") {
      setActive(false);
      return;
    }

    getSearch();
  }, [debouncedValue]);
  return (
    <form
      className="bg-background flex items-center border rounded-xl w-[40vw] relative grow md:grow-0"
      autoFocus={false}
      autoComplete="off"
    >
      <Input
        className="border-none"
        type="text"
        id="search"
        placeholder="Search a place"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setActive(true)}
        onBlur={() => (search === "" ? setActive(false) : null)}
      />
      <Label htmlFor="search" className="m-2 cursor-pointer">
        {active ? (
          <XMarkIcon
            className="h-6 "
            onClick={() => {
              setActive(false);
              setSearch("");
              setResults(undefined);
            }}
          />
        ) : (
          <MagnifyingGlassIcon className="h-6 " />
        )}
      </Label>
      {active && (
        <SearchResult
          loading={loading}
          setActive={setActive}
          results={results!}
        />
      )}
    </form>
  );
}
