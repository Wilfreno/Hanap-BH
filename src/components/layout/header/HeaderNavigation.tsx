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
      {/* Mobile */}
      <>
        <Link
          href={"/nearby"}
          as={"/nearby"}
          className={cn(
            "sm:hidden grow sm:grow-0 flex items-center justify-center p-2 py-3 sm:p-0 sm:py-0 hover:text-primary",
            path_name.endsWith("/nearby") && "text-primary"
          )}
        >
          <ListBulletIcon className="h-6 w-auto stroke-[2px]" />
        </Link>
        <Link
          href={"/search"}
          as={"/search"}
          className={cn(
            "sm:hidden grow sm:grow-0 flex items-center justify-center p-2 py-3 sm:p-0 sm:py-0 hover:text-primary",
            path_name.endsWith("/search") && "text-primary"
          )}
        >
          <MagnifyingGlassIcon className="h-6 w-auto stroke-[2px]" />
        </Link>
        <Link
          href={"/map"}
          as={"/map"}
          className={cn(
            "sm:hidden grow sm:grow-0 flex items-center justify-center p-2 py-3 sm:p-0 sm:py-0 hover:text-primary",
            path_name.endsWith("/map") && "text-primary"
          )}
        >
          <MapIcon className="h-6 w-auto stroke-[2px]" />
        </Link>
        <Link
          href={"/browse"}
          as={"/browse"}
          className={cn(
            "sm:hidden grow sm:grow-0 flex items-center justify-center p-2 py-3 sm:p-0 sm:py-0 hover:text-primary",
            path_name.endsWith("/browse") && "text-primary"
          )}
        >
          <GlobeAltIcon className="h-6 w-auto stroke-[2px]" />
        </Link>
      </>

      {/* Desktop */}
      <>
        <Link
          href={"/nearby"}
          as={"/nearby"}
          className={cn(
            "hidden grow sm:grow-0 sm:flex items-center justify-center p-2 py-3 sm:p-0 sm:py-0 hover:text-primary",
            path_name.endsWith("/nearby") && "text-primary"
          )}
        >
          Nearby
        </Link>
        <Link
          href={"/search"}
          as={"/search"}
          className={cn(
            "hidden grow sm:grow-0 sm:flex items-center justify-center p-2 py-3 sm:p-0 sm:py-0 hover:text-primary",
            path_name.endsWith("/search") && "text-primary"
          )}
        >
          Search
        </Link>
        <Link
          href={"/map"}
          as={"/map"}
          className={cn(
            "hidden grow sm:grow-0 sm:flex items-center justify-center p-2 py-3 sm:p-0 sm:py-0 hover:text-primary",
            path_name.endsWith("/map") && "text-primary"
          )}
        >
          Map
        </Link>
        <Link
          href={"/browse"}
          as={"/browse"}
          className={cn(
            "hidden grow sm:grow-0 sm:flex items-center justify-center p-2 py-3 sm:p-0 sm:py-0 hover:text-primary",
            path_name.endsWith("/browse") && "text-primary"
          )}
        >
          Browse
        </Link>
      </>
    </nav>
  );
}
