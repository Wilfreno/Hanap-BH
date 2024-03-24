import useNearbyPlacesAPI from "@/components/hooks/useNearbyPlacesAPI";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState } from "react";
import MapPlaceListCard from "./MapPlaceListCard";
import { cn } from "@/lib/utils";
export default function MapPlaceList() {
  const { nearby_place, next } = useNearbyPlacesAPI();
  const [open, setOpen] = useState(true);

  const CloseIcon = motion(ChevronDoubleRightIcon);
  const OpenIcon = motion(ChevronDoubleLeftIcon);

  return (
    <motion.section
      initial={{ width: 0 }}
      animate={open ? { width: "30vw" } : { width: 0 }}
      className="relative h-[100svh] bg-background shadow-lg"
    >
      <span
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "absolute left-[100%] top-2 z-50 rounded-r-lg cursor-pointer text-primary p-1",
          open && "bg-background rounded-r-lg shadow-lg"
        )}
      >
        {open ? (
          <OpenIcon className="h-8 w-auto" />
        ) : (
          <CloseIcon
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="h-8 w-auto"
          />
        )}
      </span>
      <ScrollArea className="overflow-x-hidden h-[100svh] px-1 py-2">
        <ul className="space-y-1 ">
          {nearby_place.map((place, index) => (
            <MapPlaceListCard
              key={place.name}
              place={place}
              index={index}
              next={next}
              nearby_place_length={nearby_place.length}
            />
          ))}
        </ul>
      </ScrollArea>
    </motion.section>
  );
}
