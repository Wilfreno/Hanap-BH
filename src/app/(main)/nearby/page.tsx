"use client";

import useNearbyLodgingAPI from "@/components/hooks/useNearbyLodgingsAPI";
import MainContent from "@/components/page/main/MainContent";
import NoSearchResults from "@/components/page/error/NoSearchResults";
import LocationAccesDenied from "@/components/reusables/LocationAccessDebied";
import { Suspense } from "react";

export default function page() {
  const { request_status, nearby_lodgings } = useNearbyLodgingAPI();

  return (
    <Suspense>
      <LocationAccesDenied>
        {request_status === "NO_RESULT" ? (
          <NoSearchResults />
        ) : (
          <MainContent lodgings={nearby_lodgings} />
        )}
      </LocationAccesDenied>
    </Suspense>
  );
}
