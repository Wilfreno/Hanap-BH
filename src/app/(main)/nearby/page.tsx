"use client";
import useNearbyPlacesAPI from "@/components/hooks/useNearbyPlacesAPI";
import AccesDenied from "@/components/page/error/AccesDenied";
import MainContent from "@/components/page/main/MainContent";
import NoSearchResults from "@/components/page/error/NoSearchResults";

export default function page() {
  const { status, nearby_place, next, next_page_token, position_status_error } =
    useNearbyPlacesAPI();
  return (
    <>
      {position_status_error?.PERMISSION_DENIED ? (
        <AccesDenied />
      ) : status === "NO_RESULT" ? (
        <NoSearchResults />
      ) : (
        <MainContent
          places={nearby_place}
          next={next}
          next_page_token={next_page_token!}
        />
      )}
    </>
  );
}
