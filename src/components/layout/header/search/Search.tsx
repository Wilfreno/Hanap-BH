"use client";
import { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import useInputDebounce from "@/lib/hooks/useInputDebounce";
import useAutoComplete from "@/lib/hooks/useAutoComplete";
const ResultDropDown = dynamic(
  () => import("@/components/layout/header/search/ResultDropDown")
);
export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const debouncedValue = useInputDebounce(search, 300);
  const result = useAutoComplete(debouncedValue);
  return (
    <form
      className={`flex grow items-center rounded-full py-2 px-2 sm:border-2  sm:shadow-sm sm:grow-0 w-[40%] text-gray-900`}
      autoFocus={false}
      autoComplete="off"
    >
      <input
        className={`w-full px-5 bg-transparent outline-none text-gray-700 placeholder-gray-400 `}
        type="text"
        id="search"
        placeholder="Search a place"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      />
      {active ? (
        <XMarkIcon
          className="h-6 cursor-pointer"
          onClick={() => {
            setSearch("");
          }}
        />
      ) : (
        <label
          htmlFor="search"
          className="rounded-full md:bg-gray-900 md:mx-px"
        >
          <MagnifyingGlassIcon
            className={`h-6 text-gray-500  cursor-pointer  md:text-white md:m-1 `}
          />
        </label>
      )}
      {active ? <ResultDropDown results={result} /> : null}
    </form>
  );
}
