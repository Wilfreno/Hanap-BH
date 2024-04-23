"use client";

import NoSearchResults from "@/components/page/error/NoSearchResults";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setSelectedLodging } from "@/lib/redux/slice/selected-lodging";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import MainContentCard from "@/components/page/main/MainContentCard";

export default function Page() {
  const nearby_lodgings = useAppSelector(
    (state) => state.nearby_lodging_reducer
  );
  const dispatch = useDispatch<AppDispatch>();
  const main_ref = useRef<HTMLElement>(null);
  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
        main_ref.current?.offsetHeight!
      )
        console.log("at bottom");
    }
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [main_ref]);
  return nearby_lodgings.status === "NO_RESULT" ? (
    <NoSearchResults />
  ) : (
    <main
      ref={main_ref}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-[10dvh] sm:mx-[10vw] gap-y-10"
    >
      {[...nearby_lodgings.data]
        .sort((a, b) => a.distance! - b.distance!)
        .map((lodging) => (
          <Link
            key={lodging.name}
            href={`/lodging/${lodging.id}`}
            as={`/lodging/${lodging.id}`}
            prefetch
            onClick={() => dispatch(setSelectedLodging({ ...lodging }))}
          >
            <Card
              key={lodging.name}
              className="cursor-pointer border-none shadow-none"
            >
              <MainContentCard lodging={lodging} />
            </Card>
          </Link>
        ))}
    </main>
  );
}
