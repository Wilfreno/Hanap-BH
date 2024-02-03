"use client";
import MainPagination from "@/components/page/main/MainPagination";
import useNearbyPlacesAPI from "@/components/hooks/useNearbyPlacesAPI";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MainSkeleton from "@/components/loading-skeleton/MainSkeleton";

const Main = dynamic(() => import("@/components/page/main/Main"), {
  loading: () => <MainSkeleton />,
});

export default function page() {
  const [page, setPage] = useState(1);
  const [page_count, setPageCount] = useState(0);
  const { nearby_place, next } = useNearbyPlacesAPI();
  useEffect(() => {
    setPageCount(Math.ceil(nearby_place?.length! / 4));
  }, [nearby_place]);

  useEffect(() => {
    if (page === page_count - 1) next();
  }, [page]);

  return (
    <main className="py-10 flex flex-col justify-between h-screen">

      <Main nearby_place={nearby_place!} page={page} />
      {nearby_place ? (
        <MainPagination page={page} setPage={setPage} page_count={page_count} />
      ) : null}
    </main>
  );
}
