import { PlaceDetailsType } from "@/lib/types/place-detail";
import { useCallback, useEffect, useState } from "react";
import MainCard from "./MainCard";
import MainFetchMobileSkeleton from "@/components/loading-skeleton/MainFetchMobileSkeleton";

export default function Main({
  nearby_place,
  page,
  next,
}: {
  page: number;
  nearby_place: PlaceDetailsType[];
  next: () => Promise<void>;
}) {
  const [on_mobile, setOnMobile] = useState(false);
  const [fetching, setFetching] = useState(false);

  const last_element = useCallback(
    (div: HTMLDivElement) => {
      if (window.innerWidth <= 640) {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            getNextPage();
          }
        });
        observer.observe(div);
      }
    },
    [nearby_place, innerWidth]
  );

  async function getNextPage() {
    setFetching(true);
    await next();
    setFetching(false);
  }

  function handleResize() {
    setOnMobile(window.innerWidth <= 640);
  }

  useEffect(() => {
    setOnMobile(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <section className="grid grid-cols-1 sm:grid-cols-4 sm:items-center sm:grow gap-[5vh]">
      {on_mobile ? (
        <>
          {nearby_place?.map((place, index) => {
            if (index < nearby_place.length - 1)
              return <MainCard key={place.name} place={place} index={index} />;
            return (
              <MainCard
                callback={last_element}
                key={place.name}
                place={place}
                index={index}
              />
            );
          })}
          {fetching && <MainFetchMobileSkeleton />}
        </>
      ) : (
        nearby_place
          ?.slice((page - 1) * 4, page * 4)
          .map((place, index) => (
            <MainCard key={place.name} place={place} index={index} />
          ))
      )}
    </section>
  );
}
