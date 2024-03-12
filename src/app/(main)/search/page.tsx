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

export type PSGCResponseType = {
  name: string;
  code: string;
};

export type SearchType = {
  autocomplete: string;
  lodging_type: string;
  location: {
    province: PSGCResponseType;
    municipality_cities: PSGCResponseType;
    barangay: PSGCResponseType;
  };
};
export default function page() {
  const { nearby_place } = useNearbyPlacesAPI();
  const http_request = useHTTPRequest();
  const [result, setResult] = useState<PlaceDetailsType[]>();
  const [status, setStatus] = useState<HTTPStatusResponseType>();
  const [search, setSearch] = useState<SearchType>();
  const debounced_value = useInputDebounce(search);

  useEffect(() => {
    async function getData() {
      const r = await http_request.get("/api/autocomplete", debounced_value!);
      setResult(r.data);
      setStatus(r.status);
    }
    if (search) getData;
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
