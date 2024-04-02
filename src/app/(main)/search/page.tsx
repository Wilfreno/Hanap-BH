"use client";

import useNearbyPlacesAPI from "@/components/hooks/useNearbyPlacesAPI";
import Search from "@/components/page/search/Search";
import MainContent from "@/components/page/main/MainContent";
import { useState } from "react";
import { HTTPStatusResponseType } from "@/lib/types/http-request-response";
import NoSearchResults from "@/components/page/error/NoSearchResults";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";

export default function page() {
  const { nearby_lodgings } = useNearbyPlacesAPI();
  const [result, setResult] = useState<LodgingDetailsType[]>();
  const [status, setStatus] = useState<HTTPStatusResponseType>();

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
