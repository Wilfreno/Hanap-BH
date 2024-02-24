import useNearbyPlacesAPI from "@/components/hooks/useNearbyPlacesAPI";
import PlaceDetails from "@/components/reusables/PlaceDetails";
import { motion } from "framer-motion";

export default function MainContent({}) {
  const { nearby_place, next } = useNearbyPlacesAPI();

  return (
    <section className="grid sm:grid-cols-4 sm:items-center sm:justify-between gap-10 p-10">
      {nearby_place.map((place, index) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 * index, duration: 0.3 }}
          className=" shadow-md rounded-lg bg-background aspect-square"
        >
          <PlaceDetails place={place} />
        </motion.div>
      ))}
    </section>
  );
}
