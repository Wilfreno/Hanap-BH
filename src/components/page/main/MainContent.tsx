import { motion } from "framer-motion";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import FetchingSkeleton from "@/components/loading-skeleton/FetchingSkeleton";
import { useEffect, useState } from "react";
import MainContentCard from "./MainContentCard";

export default function MainContent({
  places,
  next,
  next_page_token,
}: {
  next_page_token?: string;
  places: PlaceDetailsType[];
  next?: () => Promise<void>;
}) {
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    async function fetchData() {
      if (fetching && next) {
        await next();
        console.log(next_page_token);
      }
      setFetching(false);
    }
    fetchData();
  }, [fetching]);

  return (
    <main className="grow grid grid-cols-1 sm:grid-cols-4 sm:items-center sm:justify-between gap-10 mx-5 sm:mx-[10vw] my-[10dvh] h-fit">
      {places.map((place, index) => (
        <motion.div
          key={place.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 * index, duration: 0.3 }}
          className="rounded-lg relative cursor-pointer"
          viewport={{ amount: "all" }}
          onViewportEnter={() => {
            places.length > 4
              ? index === places.length - 5 && next_page_token
                ? setFetching(true)
                : null
              : setFetching(true);
          }}
        >
          <MainContentCard place={place} />
        </motion.div>
      ))}
      {fetching && <FetchingSkeleton />}
    </main>
  );
}
