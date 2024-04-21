"use client";

import MainContent from "@/components/page/main/MainContent";
import NoSearchResults from "@/components/page/error/NoSearchResults";
import LocationAccesDenied from "@/components/LocationAccessDenied";
import { Suspense } from "react";
import useNearbyLodgingAPI from "@/components/hooks/useNearbyLodgingsAPI";

export default function Page() {
  const { request_status, nearby_lodgings } = useNearbyLodgingAPI();

  return (
    <LocationAccesDenied>
      {request_status === "NO_RESULT" ? (
        <NoSearchResults />
      ) : (
        <MainContent lodgings={nearby_lodgings} />
      )}
    </LocationAccesDenied>
  );
}
