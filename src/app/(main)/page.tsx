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

const MainMobile = dynamic(
  () => import("@/components/page/main/mobile/MainMobile"),
  {
    ssr: false,
    loading: () => <MainSkeleton />,
  }
);
export default function page() {
  const [on_mobile, setOnMobile] = useState(false);
  const [page, setPage] = useState(1);
  const [page_count, setPageCount] = useState(0);
  const { nearby_place, next } = useNearbyPlacesAPI();

  function handleResize() {
    setOnMobile(window.innerWidth <= 640);
  }

  useEffect(() => {
    setPageCount(Math.ceil(nearby_place?.length! / 4));
  }, [nearby_place]);

  useEffect(() => {
    setOnMobile(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <main className="sm:flex sm:flex-col sm:px-2 pb-[8svh] sm:py-0 space-y-10 justify-evenly items-center sm:h-[90svh]">
      {!on_mobile ? (
        <Main nearby_place={nearby_place!} page={page} />
      ) : (
        <MainMobile nearby_place={nearby_place!} next={next} />
      )}
      <MainPagination
        page={page}
        setPage={setPage}
        page_count={page_count}
        next={next}
      />
    </main>
  );
}
