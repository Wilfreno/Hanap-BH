"use client";
import { useState } from "react";
import useInputDebounce from "@/components/hooks/useInputDebounce";
import Name from "./name/Name";
import { AnimatePresence } from "framer-motion";
import Preference from "./preference/Preference";
import { Button } from "@/components/ui/button";
export default function Search() {
  const [search_view, setSearchView] = useState("preference");
  const [search, setSearch] = useState<string>("");

  return (
    <section className="flex flex-col items-center space-y-5 mt-10 mb-5">
      <Button
        size="sm"
        variant="outline"
        className="rounded-full text-xs font-bold"
        onClick={() =>
          search_view !== "preference"
            ? setSearchView("preference")
            : setSearchView("name")
        }
      >
        {search_view === "name"
          ? "Search Your Preference"
          : "Search Housing Name"}
      </Button>
      <AnimatePresence>
        <form
          autoFocus={false}
          autoComplete="off"
          key="form"
          className="border rounded-full flex items-center justify-evenly w-fit px-2 space-x-5"
        >
          {search_view === "name" && <Name />}
          {search_view === "preference" && <Preference />}
        </form>
      </AnimatePresence>
    </section>
  );
}
