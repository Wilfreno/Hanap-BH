import PlaceImage from "@/components/reusables/PlaceImage";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LodgingImage({ place }: { place: PlaceDetailsType }) {
  const [photo_index, setPhotoIndex] = useState(0);
  const [photo_enhance, setPhotoEnhance] = useState(false);

  useEffect(() => {
    window.scrollY === 0 ? setPhotoEnhance(true) : setPhotoEnhance(false);

    function handleScroll() {
      window.scrollY === 0 ? setPhotoEnhance(true) : setPhotoEnhance(false);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.section
      animate={
        photo_enhance
          ? { height: "100dvh" }
          : { height: "fit-content", padding: "1rem" }
      }
      className="relative"
    >
      <div className="grid grid-rows-[1fr_auto] ">
        <motion.div
          animate={photo_enhance ? { height: "70dvh" } : { height: "60dvh" }}
          className="grow grid my-5"
        >
          <div className="aspect-video relative overflow-hidden justify-self-center h-full w-auto rounded-lg">
            <PlaceImage photo={place?.photos?.[photo_index]} />
          </div>
        </motion.div>
        <motion.div
          initial={{ width: "90%" }}
          animate={photo_enhance ? { width: "90%" } : { width: "70%" }}
          className="flex h-[12dvh] border-2 rounded-lg p-1 space-x-3 justify-self-center"
        >
          {place?.photos.map((photo, index) => (
            <motion.span
              key={photo}
              whileHover={index !== photo_index ? { scale: 1.05 } : undefined}
              className={cn(
                "aspect-video h-full w-auto relative  overflow-hidden rounded-lg",
                index === photo_index
                  ? "opacity-50"
                  : "cursor-pointer hover:opacity-50"
              )}
              onClick={() => setPhotoIndex(index)}
            >
              <PlaceImage photo={photo} />
            </motion.span>
          ))}
        </motion.div>
      </div>
      <motion.div
        animate={photo_enhance ? { opacity: 0.9 } : { opacity: 0.2 }}
        className="top-0 left-0 -z-10 overflow-hidden absolute h-full w-full"
      >
        <PlaceImage
          asBackground
          photo={place?.photos[photo_index]}
          className="object-fit blur-sm"
        />
      </motion.div>
    </motion.section>
  );
}
