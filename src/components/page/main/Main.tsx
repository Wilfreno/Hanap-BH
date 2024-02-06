import { PlaceDetailsType } from "@/lib/types/place-detail";
import MainCard from "./MainCard";
import { motion } from "framer-motion";

export default function Main({
  nearby_place,
  page,
}: {
  page: number;
  nearby_place: PlaceDetailsType[];
}) {
  return (
    <section className="grid grid-cols-4 items-center grow gap-5">
      {nearby_place?.slice((page - 1) * 4, page * 4).map((place, index) => (
        <motion.div
          key={place.name}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 * index, duration: 0.3 }}
          whileHover={{
            border: "1px",
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          className=" sm:w-[20vw] h-auto shadow-md rounded-lg cursor-pointer sm:hover:shadow-xl hover:bg-muted bg-background"
        >
          <MainCard place={place} />
        </motion.div>
      ))}
    </section>
  );
}
