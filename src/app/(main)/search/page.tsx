"use client";

import Search from "@/components/page/main/search/Search";
import { useState } from "react";
import NoSearchResults from "@/components/page/error/NoSearchResults";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { APIStatusResponseType } from "@/lib/types/api-request-response";
import { useAppSelector } from "@/lib/redux/store";
import LodgingCard from "@/components/page/main/LodgingCard";

export default function Page() {
  const [result, setResult] = useState<LodgingDetailsType[]>();
  const [status, setStatus] = useState<APIStatusResponseType>();
  const nearby_lodgings = useAppSelector(
    (state) => state.nearby_lodging_reducer
  );

  return (
    <main className="grid grid-rows-2">
      <Search result={(r) => setResult(r)} status={(s) => setStatus(s)} />
      <section>
        {status === "NO_RESULT" ? (
          <NoSearchResults />
        ) : result ? (
          [...result]
            .sort((a, b) => a.distance! - b.distance!)
            .map((lodging, index) => (
              <LodgingCard index={index} lodging={lodging} key={lodging.name} />
            ))
        ) : (
          [...nearby_lodgings.data]
            .sort((a, b) => a.distance! - b.distance!)
            .map((lodging, index) => (
              <LodgingCard index={index} lodging={lodging} key={lodging.name} />
            ))
        )}
      </section>
    </main>
  );
}
