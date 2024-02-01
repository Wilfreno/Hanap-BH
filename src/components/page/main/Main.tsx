"use client";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import { StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import quickSort from "@/lib/google-api/sort";
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
      <motion.section className="flex justify-evenly">
        {nearby_place?.map((place, index) => (
          <motion.div
            key={place.name}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ delay: 0.2 * index, duration: 0.3 }}
            className="w-[18rem] h-auto shadow-lg"
          >
            <motion.div className="relative overflow-hidden w-full h-auto rounded-lg">
              <Image
                src={`https://maps.googleapis.com/maps/api/place/photo?key=${api_key}&photo_reference=${place.photos[0]}&maxheight=1080&maxwidth=1920`}
                alt={place.photos[0]}
                height={1080}
                width={1920}
                priority
                className="aspect-square w-full h-auto rounded-lg"
              />
            </motion.div>
            <motion.div className="p-1 h-[20vh] flex flex-col justify-between">
              <motion.div>
                <h1 className="font-bold text-xl">
                  {place.name.length > 22
                    ? `${place.name.slice(0, 22)}...`
                    : place.name}
                </h1>
                <h2 className="text-sm text-muted-foreground">
                  {place.location.vicinity}
                </h2>
              </motion.div>
              <motion.div className="flex items-center justify-between font-semibold">
                <p>{place.distance.toFixed(2)} Km away</p>
                <p className="flex">
                  {place.rating.average}
                  <StarIcon className="h-5 w-auto" />
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.section>
    </AnimatePresence>
  );
}
