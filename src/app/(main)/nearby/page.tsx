"use client";

export const dynamic = "force-dynamic";

import NoSearchResults from "@/components/page/error/NoSearchResults";
import { useAppSelector } from "@/lib/redux/store";
import { useState } from "react";
import LodgingCard from "@/components/page/main/LodgingCard";
import FetchingSkeleton from "@/components/loading-skeleton/FetchingSkeleton";

export default function Page() {
  const nearby_lodgings = useAppSelector(
    (state) => state.nearby_lodging_reducer
  );

  const [fetching, setFetching] = useState(false);

  return nearby_lodgings.status === "NO_RESULT" ? (
    <NoSearchResults />
  ) : (
    <main className="my-[10dvh] ">
      <section className="flex flex-wrap justify-center">
        {[...nearby_lodgings.data]
          .sort((a, b) => a.distance! - b.distance!)
          .map((lodging, index) => (
            <LodgingCard
              index={index}
              lodging={lodging}
              setFetching={setFetching}
              key={lodging.name}
            />
          ))}
      </section>
      {fetching && <FetchingSkeleton />}
    </main>
  );
}
