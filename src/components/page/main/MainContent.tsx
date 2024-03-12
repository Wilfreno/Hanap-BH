import { motion } from "framer-motion";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import FetchingSkeleton from "@/components/loading-skeleton/FetchingSkeleton";
import { useEffect, useState } from "react";
import useSessionStorage from "@/components/hooks/useSessionStorage";
import dynamic from "next/dynamic";
import PlaceCardSkeleton from "@/components/loading-skeleton/PlaceCardSkeleton";

const PlaceCard = dynamic(
  () => import("@/components/page/main/MainContentCard"),
  { loading: () => <PlaceCardSkeleton /> }
);
export default function MainContent({
  places,
  next,
}: {
  places: PlaceDetailsType[];
  next?: () => Promise<void>;
}) {
  const [fetching, setFetching] = useState(false);
  const session_storage = useSessionStorage();
  const token = session_storage.get("next_page_token");
  useEffect(() => {
    async function fetchData() {
      if (fetching && next) await next();
      setFetching(false);
    }
    fetchData();
  }, [fetching]);

  return (
    <>
      <section className="grow grid sm:grid-cols-4 sm:items-center sm:justify-between gap-10 mx-[10vw] my-[10dvh] h-fit">
        {places.map((place, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
            className="rounded-lg relative cursor-pointer"
            viewport={{ amount: "all" }}
            onViewportEnter={() =>
              index === places.length - 11 && token ? setFetching(true) : null
            }
          >
            <PlaceCard place={place} />
          </motion.div>
        ))}
        {fetching && <FetchingSkeleton />}
      </section>
    </>
  );
}
