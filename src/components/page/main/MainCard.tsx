import { PlaceDetailsType } from "@/lib/types/place-detail";
import Image from "next/image";
import { motion } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/outline";
import NoImageSvg from "@/components/svg/NoImageSvg";

export default function MainCard({
  place,
  index,
  callback,
}: {
  place: PlaceDetailsType;
  index: number;
  callback?: any;
}) {
  const api_key = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_PLACE_API_KEY is missing");

  return (
    <motion.div
      ref={callback}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 * index, duration: 0.3 }}
      whileHover={{
        border: "1px",
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      className="w-full sm:w-[20vw] h-auto shadow-md rounded-lg cursor-pointer sm:hover:shadow-xl hover:bg-muted bg-background"
    >
      <div className="relative overflow-hidden w-full h-auto rounded-t-lg flex">
        {place?.photos.length > 0 ? (
          <Image
            src={`https://maps.googleapis.com/maps/api/place/photo?key=${api_key}&photo_reference=${place.photos[0]}&maxheight=1080&maxwidth=1920`}
            alt={place.photos[0]}
            height={1080}
            width={1920}
            priority
            className="aspect-square w-full h-auto"
          />
        ) : (
          <span className="aspect-square w-full h-full flex items-center justify-center fill-secondary dark:fill-none">
            <NoImageSvg className="w-1/3 h-full stroke-muted-foreground" />
          </span>
        )}
      </div>
      <div className="p-1 h-[20vh] flex flex-col justify-between ">
        <div className="space-y-1 px-1">
          <h1 className="font-bold sm:text-sm md:text-base lg:text-xl whitespace-nowrap">
            {place?.name.length > 20
              ? `${place?.name.slice(0, 20)}...`
              : place?.name}
          </h1>
          <h2 className="text-xs text-muted-foreground">
            {place?.location.vicinity}
          </h2>
        </div>
        <div className="flex items-center justify-between font-semibold p-2">
          <p>{place?.distance.toFixed(2)} Km away</p>
          <p className="flex items-center space-x-2">
            {place?.rating.average}
            <StarIcon className="h-4 w-auto" />
          </p>
        </div>
      </div>
    </motion.div>
  );
}
