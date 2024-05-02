"use client";

export const dynamic = "force-dynamic";

import NoSearchResults from "@/components/page/error/NoSearchResults";
import { useAppSelector } from "@/lib/redux/store";
import { useState } from "react";
import LodgingCard from "@/components/page/main/LodgingCard";
import FetchingSkeleton from "@/components/loading-skeleton/FetchingSkeleton";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { APIStatusResponseType } from "@/lib/types/api-request-response";
import Search from "@/components/page/main/search/Search";

export default function Page() {
  const nearby_lodgings = useAppSelector(
    (state) => state.nearby_lodging_reducer
  );
  const [result, setResult] = useState<LodgingDetailsType[]>();
  const [status, setStatus] = useState<APIStatusResponseType>();

  const [fetching, setFetching] = useState(false);

  return (
    <main className=" grid grid-rows-[auto_1fr]">
      <Search result={(r) => setResult(r)} status={(s) => setStatus(s)} />
      <section className="grid">
        {status === "NO_RESULT" || nearby_lodgings.status === "NO_RESULT" ? (
          <NoSearchResults />
        ) : (
          <div className="flex flex-wrap justify-center">
            {result
              ? [...result]
                  .sort((a, b) => a.distance! - b.distance!)
                  .map((lodging, index) => (
                    <LodgingCard
                      index={index}
                      lodging={lodging}
                      key={lodging.name}
                    />
                  ))
              : [...nearby_lodgings.data]
                  .sort((a, b) => a.distance! - b.distance!)
                  .map((lodging, index) => (
                    <LodgingCard
                      index={index}
                      lodging={lodging}
                      setFetching={setFetching}
                      key={lodging.id}
                    />
                  ))}
          </div>
        )}
        {fetching && <FetchingSkeleton />}
      </section>
    </main>
  );
}
