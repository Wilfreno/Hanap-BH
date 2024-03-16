"use client";

import useNearbyPlacesAPI from "@/components/hooks/useNearbyPlacesAPI";
import Search from "@/components/page/search/Search";
import MainContent from "@/components/page/main/MainContent";
import { useEffect, useState } from "react";
import useInputDebounce from "@/components/hooks/useInputDebounce";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import useHTTPRequest from "@/components/hooks/useHTTPRequest";
import { HTTPStatusResponseType } from "@/lib/types/http-request-response";
import NoSearchResults from "@/components/reusables/NoSearchResults";
import { PhilippinesPlaces } from "@/lib/types/psgc-types";
import useCurrentPosition from "@/components/hooks/useCurrentPosition";

export type PSGCResponseType = {
  name: string;
  code: string;
};

export type SearchType = {
  autocomplete: string;
  lodging_type: string;
  location: PhilippinesPlaces;
};
export default function page() {
  const { nearby_place } = useNearbyPlacesAPI();
  const { coordinates } = useCurrentPosition();
  const http_request = useHTTPRequest();
  const [result, setResult] = useState<PlaceDetailsType[]>();
  const [status, setStatus] = useState<HTTPStatusResponseType>();
  const [search, setSearch] = useState<SearchType>();
  const debounced_value = useInputDebounce(search);
  useEffect(() => {
    async function getData() {
      if (
        !debounced_value?.autocomplete &&
        !debounced_value?.location &&
        !debounced_value?.lodging_type
      ) {
        setResult(undefined);
        return;
      }

      const r = await http_request.post("/api/place/search", {
        ...debounced_value!,
        lat: coordinates?.lat,
        lng: coordinates?.lng,
      });

      if (r.status === "OK") setResult(r.data);
      setStatus(r.status);
    }
    if (search) getData();
  }, [debounced_value]);
  return (
    <>
      <Search search={search!} setSearch={setSearch} />
      {status === "NO_RESULT" ? (
        <NoSearchResults />
      ) : (
        <MainContent places={result ? result : nearby_place} />
      )}
    </>
  );
}
