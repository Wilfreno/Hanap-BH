import CustomImage from "@/components/reusables/CustomImage";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { Photo } from "@prisma/client";
import { motion } from "framer-motion";

export default function LodgingMainImage({
  photo_enhance,
  photo,
}: {
  photo_enhance: boolean;
  photo: Photo;
}) {
  return (
    <>
      {/* Desktop */}
      <motion.div
        animate={photo_enhance ? { height: "70dvh" } : { height: "60dvh" }}
        className="hidden sm:grid aspect-video relative overflow-hidden h-auto rounded-lg"
      >
        <CustomImage photo={photo?.photo_url!} />
      </motion.div>
      {/* Mobile */}
      <motion.div></motion.div>
    </>
  );
}
