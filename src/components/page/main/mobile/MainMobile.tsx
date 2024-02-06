import { PlaceDetailsType } from "@/lib/types/place-detail";
import React, { Ref, useCallback, useEffect, useRef, useState } from "react";
import MainCard from "../MainCard";
import { AnimatePresence, motion } from "framer-motion";
import MainFetchMobileSkeleton from "@/components/loading-skeleton/MainFetchMobileSkeleton";
export default function MainMobile({
  nearby_place,
  next,
}: {
  nearby_place: PlaceDetailsType[];
  next: () => Promise<void>;
}) {
  const [fetching, setFetching] = useState(false);
  async function getNextPage() {
    setFetching(true);
    await next();
    setFetching(false);
  }

  return (
    <div className="grid grid-cols-1 space-y-2">
      <AnimatePresence>
        {nearby_place?.map((place, index) => (
          <motion.div
            id={place.place_id}
            key={place.name}
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onViewportEnter={() =>
              index === nearby_place.length - 1 ? getNextPage() : null
            }
            className="w-full sm:w-[20vw] h-auto shadow-md rounded-sm cursor-pointer sm:hover:shadow-xl bg-background"
          >
            <MainCard place={place} />
          </motion.div>
        ))}
        {fetching && <MainFetchMobileSkeleton />}
      </AnimatePresence>
    </div>
  );
}
