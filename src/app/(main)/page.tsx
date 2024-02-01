"use client";
import Main from "@/components/page/main/Main";
import MainPagination from "@/components/page/main/MainPagination";
import quickSort from "@/lib/google-api/sort";
import useNearbyPlacesAPI from "@/components/hooks/useNearbyPlacesAPI";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import { useEffect, useState } from "react";

export default function page() {
  const [page, setPage] = useState(1);
  const [page_count, setPageCount] = useState(0);
  const [page_content, setPageContent] = useState<PlaceDetailsType[]>();
  const nearby_place = useNearbyPlacesAPI();
  useEffect(() => {
    setPageCount(Math.ceil(nearby_place?.length! / 4));
  }, [nearby_place?.length]);
  useEffect(() => {
    if (nearby_place)
      setPageContent(quickSort(nearby_place?.slice((page - 1) * 4, page * 4)!));
  }, [page, nearby_place]);
  return (
    <main className="pt-10 space-y-20 ">
      <Main nearby_place={page_content!} page={page} />

      {nearby_place ? (
        <MainPagination page={page} setPage={setPage} page_count={page_count} />
      ) : null}
    </main>
  );
}
