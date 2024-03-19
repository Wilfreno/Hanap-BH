import { motion } from "framer-motion";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import FetchingSkeleton from "@/components/loading-skeleton/FetchingSkeleton";
import { useEffect, useState } from "react";
import MainContentCard from "./MainContentCard";
import Link from "next/link";
import { cn } from "@/lib/utils";
import quickDistanceSort from "@/lib/sort/distance-sort";

export default function MainContent({
  places,
  next,
  next_page_token,
  children,
}: {
  next_page_token?: string;
  places: PlaceDetailsType[];
  next?: () => Promise<void>;
  children?: React.ReactNode;
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
    <main className={cn("grid", children && "grid-rows-[auto_1fr]")}>
      {children}
      <section className="flex flex-col sm:flex-row flex-wrap gap-10  mx-5 sm:mx-[10vw] my-[10dvh] h-fit">
        {quickDistanceSort(places).map((place, index) => (
          <Link
            key={place.place_id}
            href={`/lodging/${place.place_id}`}
            as={`/lodging/${place.place_id}`}
            prefetch
          >
            <motion.div
              key={place.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{
                scale: 1.01,
                transition: { easings: ["easeOut"], duration: 0.1, delay: 0 },
              }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className="rounded-lg relative cursor-pointer w-[239px]"
              viewport={{ amount: "all" }}
              onViewportEnter={() => {
                places.length > 4 && !!next
                  ? index === places.length - 5 && next_page_token
                    ? setFetching(true)
                    : null
                  : setFetching(true);
              }}
            >
              <MainContentCard place={place} />
            </motion.div>
          </Link>
        ))}
        {!!next && fetching && <FetchingSkeleton />}
      </section>
    </main>
  );
}
