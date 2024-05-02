import { cn } from "@/lib/utils";
import {
  GlobeAltIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeaderNavigation() {
  const [width, setwidth] = useState<number>();
  const path_name = usePathname();

  return (
    <nav className="flex items-center sm:justify-center sm:grow sm:mx-auto sm:space-x-10 font-semibold text-base text-muted-foreground sm:pl-16">
      <Link
        href={"/nearby"}
        as={"/nearby"}
        className={cn(
          "grow sm:grow-0 flex items-center justify-center p-2 py-3 sm:p-0 sm:py-0 hover:text-primary",
          path_name.endsWith("/nearby") && "text-primary"
        )}
      >
        <span className="hidden sm:flex">Nearby</span>
        <ListBulletIcon className="flex sm:hidden h-6 w-auto stroke-[2px]" />
      </Link>
      <Link
        href={"/map"}
        as={"/map"}
        className={cn(
          "grow sm:grow-0 flex items-center justify-center p-2 py-3 sm:p-0 sm:py-0 hover:text-primary",
          path_name.endsWith("/map") && "text-primary"
        )}
      >
        <span className="hidden sm:flex">Map</span>
        <MapIcon className="flex sm:hidden h-6 w-auto stroke-[2px]" />
      </Link>
      <Link
        href={"/browse"}
        as={"/browse"}
        className={cn(
          "grow sm:grow-0 flex items-center justify-center p-2 py-3 sm:p-0 sm:py-0 hover:text-primary",
          path_name.endsWith("/browse") && "text-primary"
        )}
      >
        <span className="hidden sm:flex">Browse</span>
        <GlobeAltIcon className="flex sm:hidden h-6 w-auto stroke-[2px]" />
      </Link>
    </nav>
  );
}
