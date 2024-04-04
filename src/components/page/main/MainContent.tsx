import { AnimatePresence, motion } from "framer-motion";
import MainContentCard from "./MainContentCard";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { Card } from "@/components/ui/card";

export default function MainContent({
  lodgings,
  children,
}: {
  lodgings: LodgingDetailsType[];
  children?: React.ReactNode;
}) {
  const MotionCard = motion(Card);
  return (
    <main className={cn("grid", children && "grid-rows-[auto_1fr]")}>
      {children}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-32 mb-5 sm:my-[8rem] sm:mx-[5vw]">
        <AnimatePresence>
          {lodgings
            .sort((a, b) => a.distance - b.distance)
            .map((lodging, index) => (
              <Link
                key={lodging.id}
                href={`/lodging/${lodging.id}`}
                as={`/lodging/${lodging.id}`}
                prefetch
              >
                <MotionCard
                  key={lodging.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{
                    scale: 1.01,
                    transition: {
                      easings: ["easeOut"],
                      duration: 0.1,
                      delay: 0,
                    },
                  }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  className="cursor-pointer border-none shadow-none"
                  viewport={{ amount: "all" }}
                >
                  <MainContentCard lodging={lodging} />
                </MotionCard>
              </Link>
            ))}
        </AnimatePresence>
      </section>
    </main>
  );
}
