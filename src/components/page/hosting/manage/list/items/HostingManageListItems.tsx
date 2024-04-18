import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import HostingManageListItemsRooms from "./HostingManageListItemsRooms";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Spinner from "@/components/svg/loading/Spinner";

export default function HostingListManageItems({
  lodging,
}: {
  lodging: LodgingDetailsType;
}) {
  const path_name = usePathname();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!path_name.endsWith(`/lodging/${lodging.id}`)) setOpen(false);
  }, [path_name]);

  return (
    <Collapsible
      open={path_name.endsWith(`/lodging/${lodging.id}`)}
      key={lodging.id}
      onOpenChange={(e) => setOpen(e)}
    >
      <CollapsibleTrigger asChild>
        <Link
          href={`/hosting/manage/lodging/${lodging.id}`}
          as={`/hosting/manage/lodging/${lodging.id}`}
          prefetch
        >
          <Button
            className={cn(
              "w-full justify-between truncate text-base",
              path_name.endsWith(`/lodging/${lodging.id}`) && "font-semibold"
            )}
            variant="ghost"
          >
            {lodging.name}
            {open && !path_name.endsWith(`/lodging/${lodging.id}`) && (
              <Spinner className="h-5 w-auto text-primary" />
            )}
          </Button>
        </Link>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-10 my-1">
        <Link
          href={`/hosting/manage/lodging/${lodging.id}`}
          as={`/hosting/manage/lodging/${lodging.id}`}
          prefetch
          className="cursor-default"
        >
          <Button
            disabled={path_name.endsWith(`/lodging/${lodging.id}`)}
            variant="ghost"
            className={cn(
              "w-full justify-start disabled:opacity-100",
              path_name.endsWith(`/lodging/${lodging.id}`) && "font-semibold"
            )}
          >
            lodging
          </Button>
        </Link>
        <HostingManageListItemsRooms />
      </CollapsibleContent>
    </Collapsible>
  );
}
