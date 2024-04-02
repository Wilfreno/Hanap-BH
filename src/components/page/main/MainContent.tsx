import { motion } from "framer-motion";
import FetchingSkeleton from "@/components/loading-skeleton/FetchingSkeleton";
import { useEffect, useState } from "react";
import MainContentCard from "./MainContentCard";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";

export default function MainContent({
  lodgings,
  next,
  next_page_token,
  children,
}: {
  next_page_token?: string;
  lodgings: LodgingDetailsType[];
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
        {lodgings
          .sort((a, b) => a.distance - b.distance)
          .map((lodging, index) => (
            <Link
              key={lodging.id}
              href={`/lodging/${lodging.id}`}
              as={`/lodging/${lodging.id}`}
              prefetch
            >
              <motion.div
                key={lodging.name}
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
                  lodgings.length > 4 && !!next
                    ? index === lodgings.length - 5 && next_page_token
                      ? setFetching(true)
                      : null
                    : setFetching(true);
                }}
              >
                <MainContentCard lodging={lodging} />
              </motion.div>
            </Link>
          ))}
        {!!next && fetching && <FetchingSkeleton />}
      </section>
    </main>
  );
}
