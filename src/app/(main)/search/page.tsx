"use client";

import useNearbyLodgingAPI from "@/components/hooks/useNearbyLodgingsAPI";
import Search from "@/components/page/search/Search";
import MainContent from "@/components/page/main/MainContent";
import { useState } from "react";
import NoSearchResults from "@/components/page/error/NoSearchResults";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { APIStatusResponseType } from "@/lib/types/api-request-response";

export default function page() {
  const { nearby_lodgings } = useNearbyLodgingAPI();
  const [result, setResult] = useState<LodgingDetailsType[]>();
  const [status, setStatus] = useState<APIStatusResponseType>();

  return (
    <>
      {status === "NO_RESULT" ? (
        <NoSearchResults>
          <Search result={(r) => setResult(r)} status={(s) => setStatus(s)} />
        </NoSearchResults>
      ) : (
        <MainContent lodgings={result ? result : nearby_lodgings}>
          <Search result={(r) => setResult(r)} status={(s) => setStatus(s)} />
        </MainContent>
      )}
    </>
  );
}
