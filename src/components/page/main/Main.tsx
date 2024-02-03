"use client";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import { StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import quickSort from "@/lib/google-api/sort";
import NoImageSvg from "@/components/svg/NoImageSvg";
export default function Main({
  nearby_place,
  page,
}: {
  page: number;
  nearby_place: PlaceDetailsType[];
}) {
  const api_key = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_PLACE_API_KEY is missing");

  return (
    <AnimatePresence>
      <section className="flex justify-evenly mt-8">

        {nearby_place &&
          quickSort(nearby_place.slice((page - 1) * 4, page * 4)!)?.map(
            (place, index) => (
              <motion.div
                key={place.name}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ delay: 0.2 * index, duration: 0.3 }}
                whileHover={{
                  border: "1px",
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                className="w-[18rem] h-auto shadow-sm rounded-lg cursor-pointer hover:shadow-xl "
              >
                <div className="relative overflow-hidden w-full h-auto rounded-lg flex">
                  {place.photos.length > 0 ? (
                    <Image
                      src={`https://maps.googleapis.com/maps/api/place/photo?key=${api_key}&photo_reference=${place.photos[0]}&maxheight=1080&maxwidth=1920`}
                      alt={place.photos[0]}
                      height={1080}
                      width={1920}
                      priority
                      className="aspect-square w-full h-auto rounded-lg"
                    />
                  ) : (
                    <span className="aspect-square w-full h-full flex items-center justify-center fill-secondary dark:fill-none">
                      <NoImageSvg className="w-1/3 h-full stroke-muted-foreground" />
                    </span>
                  )}
                </div>
                <div className="p-1 h-[20vh] flex flex-col justify-between">
                  <div>
                    <h1 className="font-bold text-xl">
                      {place.name.length > 22
                        ? `${place.name.slice(0, 22)}...`
                        : place.name}
                    </h1>
                    <h2 className="text-sm text-muted-foreground">
                      {place.location.vicinity}
                    </h2>
                  </div>
                  <div className="flex items-center justify-between font-semibold">
                    <p>{place.distance.toFixed(2)} Km away</p>
                    <p className="flex">
                      {place.rating.average}
                      <StarIcon className="h-5 w-auto" />
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          )}
      </section>
    </AnimatePresence>
  );
}
