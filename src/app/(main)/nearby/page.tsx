"use client";
import useNearbyPlacesAPI from "@/components/hooks/useNearbyPlacesAPI";
import MainContent from "@/components/page/main/MainContent";
import NoSearchResults from "@/components/reusables/NoSearchResults";

export default function page() {
  const { status, nearby_place, next, next_page_token } = useNearbyPlacesAPI();
  return (
    <>
      {status === "NO_RESULT" ? (
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
