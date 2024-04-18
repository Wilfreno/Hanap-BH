import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState } from "react";

export default function HostingManageListItemsRooms() {
  const [open, setOpen] = useState(false);

  const Motionicon = motion(ChevronRightIcon);

  return (
    <Collapsible onOpenChange={(e) => setOpen(e)}>
      <CollapsibleTrigger asChild>
        <Button className="w-full justify-between" variant="ghost">
          rooms
          <Motionicon
            initial={false}
            animate={open && { rotate: 90 }}
            className="h-4"
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-10">lalalala</CollapsibleContent>
    </Collapsible>
  );
}
