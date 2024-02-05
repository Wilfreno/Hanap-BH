"use client";
import MainPagination from "@/components/page/main/MainPagination";
import useNearbyPlacesAPI from "@/components/hooks/useNearbyPlacesAPI";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MainSkeleton from "@/components/loading-skeleton/MainSkeleton";

const Main = dynamic(() => import("@/components/page/main/Main"), {
  ssr: false,
  loading: () => <MainSkeleton />,
});

export default function page() {
  const [page, setPage] = useState(1);
  const [page_count, setPageCount] = useState(0);
  const { nearby_place, next } = useNearbyPlacesAPI();

  useEffect(() => {
    setPageCount(Math.ceil(nearby_place?.length! / 4));
  }, [nearby_place]);

  return (
    <main className="flex flex-col px-2 pb-[10svh] sm:py-0 space-y-10 justify-evenly items-center sm:h-[90svh]">
      <Main nearby_place={nearby_place!} page={page} next={next} />
      <MainPagination
        page={page}
        setPage={setPage}
        page_count={page_count}
        next={next}
      />
    </main>
  );
}
