import CustomImage from "@/components/reusables/CustomImage";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LodgingMainImage from "./LodgingMainImage";
import LodgingImageList from "./LodgingImageList";
import LodgingImageBG from "./LodgingImageBG";

export default function LodgingImage({
  photos,
}: {
  photos: LodgingDetailsType["photos"];
}) {
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
    <section
      className={cn("relative grid", photo_enhance ? "h-[92dvh]" : "h-fit p-4")}
    >
      <div className="grid grid-rows-[1fr_auto] place-items-center py-5">
        <LodgingMainImage
          photo_enhance={photo_enhance}
          photo={photos?.[photo_index]!}
        />
        <LodgingImageList
          photos={photos}
          photo_enhance={photo_enhance}
          photo_index={photo_index}
          setPhotoIndex={setPhotoIndex}
        />
      </div>
      <LodgingImageBG
        photo={photos?.[photo_index]!}
        photo_enhance={photo_enhance}
      />
    </section>
  );
}
