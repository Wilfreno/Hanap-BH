import useNearbyPlacesAPI from "@/components/hooks/useNearbyPlacesAPI";
import { motion } from "framer-motion";
import MainContentCard from "./MainContentCard";

export default function MainContent({}) {
  const { nearby_place, next } = useNearbyPlacesAPI();
  return (
    <section className="grid sm:grid-cols-4 sm:items-center sm:justify-between gap-8 p-10">
      {nearby_place.map((place, index) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
          transition={{ delay: 0.1 * index, duration: 0.3 }}
          className="rounded-lg bg-background relative cursor-pointer"
        >
          <MainContentCard place={place} />
        </motion.div>
      ))}
    </section>
  );
}
