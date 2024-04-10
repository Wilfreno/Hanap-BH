"use client";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function LodgingTypeCard({
  lodging,
}: {
  lodging: Record<string, string>;
}) {
  const [hover, setHover] = useState(false);
  const MotionCard = motion(CardContent);
  const path_name = usePathname();
  return (
    <Card key={lodging.link}>
      <MotionCard
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="aspect-square w-full h-auto"
      >
        <Link
          className={cn(
            "flex flex-col justify-center w-full h-full overflow-hidden hover:justify-evenly"
          )}
          href={`${path_name}/${lodging.link}`}
          as={`${path_name}/${lodging.link}`}
        >
          <h2
            className={cn("text-2xl font-bold mx-auto", hover && "text-base")}
          >
            {lodging.name}
          </h2>
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={
              hover
                ? { height: "fit-content", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            className="text-justify text-sm"
          >
            {lodging.description}
          </motion.p>
        </Link>
      </MotionCard>
    </Card>
  );
}
