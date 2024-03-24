import { PlaceDetailsType } from "@/lib/types/place-detail";
import { StarIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MainFetchMobileSkeleton from "@/components/loading-skeleton/MainFetchMobileSkeleton";
import PlaceImage from "@/components/reusables/PlaceImage";
export default function MapPlaceListCard({
  place,
  next,
  index,
  nearby_place_length,
}: {
  place: PlaceDetailsType;
  next: () => Promise<void>;
  index: number;
  nearby_place_length: number;
}) {
  const [fetching, setFetching] = useState(false);
  const search_params = useSearchParams();
  const place_id = search_params.get("place_id");
  const router = useRouter();
  const li_ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (place_id === place.place_id)
      li_ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [place_id, li_ref]);

  return (
    <>
      <motion.li
        onViewportEnter={async () => {
          if (place_id === place.place_id)
            li_ref.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          if (index === nearby_place_length - 1) {
            setFetching(true);
            await next();
            setFetching(false);
          }
        }}
        ref={li_ref}
        whileHover={{ scale: 1.05 }}
        className="flex flex-col justify-between rounded-lg border shadow-sm cursor-pointer hover:bg-muted mx-1"
        onClick={() => {
          if (place.place_id === place_id) {
            router.replace("/map");
            return;
          }
          router.replace(`/map?place_id=${place.place_id}`);
        }}
      >
        <AnimatePresence>
          {place_id === place.place_id && (
            <motion.span
              key={place.photos[0]}
              exit={{ height: 0, opacity: 0, transition: { duration: 0.3 } }}
            >
              <PlaceImage photo={place.photos[0]} />
            </motion.span>
          )}
        </AnimatePresence>
        <div className="p-3 space-y-10">
          <div>
            <h1 className="text-lg font-bold">{place.name}</h1>
            <h2 className="text-sm text-muted-foreground ">
              {place.location.vicinity}
            </h2>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold">
            <p>{place?.distance.toFixed(2)} Km away</p>
            <p className="flex items-center space-x-2">
              {place?.rating.average}
              <StarIcon className="h-4 w-auto" />
            </p>
          </div>
        </div>
      </motion.li>
      {fetching && <MainFetchMobileSkeleton />}
    </>
  );
}
