"use client";

import useNearbyPlacesAPI from "@/components/hooks/useNearbyPlacesAPI";
import Search from "@/components/page/search/Search";
import MainContent from "@/components/page/main/MainContent";
import { useState } from "react";
import { PlaceDetailsType } from "@/lib/types/google-places-api-type";
import { HTTPStatusResponseType } from "@/lib/types/http-request-response";
import NoSearchResults from "@/components/page/error/NoSearchResults";

export default function page() {
  const { nearby_place } = useNearbyPlacesAPI();
  const [result, setResult] = useState<PlaceDetailsType[]>();
  const [status, setStatus] = useState<HTTPStatusResponseType>();

  return (
    <>
      {status === "NO_RESULT" ? (
        <NoSearchResults>
          <Search result={(r) => setResult(r)} status={(s) => setStatus(s)} />
        </NoSearchResults>
      ) : (
        <MainContent places={result ? result : nearby_place}>
          <Search result={(r) => setResult(r)} status={(s) => setStatus(s)} />
        </MainContent>
      )}
    </>
  );
}
