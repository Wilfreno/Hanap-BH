"use client";

import { cn } from "@/lib/utils";
import { MapIcon, QueueListIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  QueueListIcon as QueueListIconSolid,
  MapIcon as MapIconSolid,
  PlusIcon as PlusIconSolid,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const path_name = usePathname();
  return (
    <footer className="fixed bottom-0 bg-background sm:hidden">
      <nav className="w-screen flex justify-evenly items-center py-2">
        <Link href="/" prefetch className={cn("  grow flex justify-center")}>
          {path_name === "/" ? (
            <QueueListIconSolid className="w-auto h-7" />
          ) : (
            <QueueListIcon className="w-auto h-7" />
          )}
        </Link>
        <Link
          href="/hosting"
          prefetch
          className={cn("  grow flex justify-center")}
        >
          {path_name === "/hosting" ? (
            <PlusIconSolid className="w-auto h-6 text-background" />
          ) : (
            <PlusIcon className="w-auto h-6 text-muted-foreground" />
          )}
        </Link>
        <Link
          href="/map"
          prefetch
          className={cn(
            "  grow flex justify-center",
            path_name === "/map" ? " bg-muted" : ""
          )}
        >
          {path_name === "/map" ? (
            <MapIconSolid className="w-auto h-7" />
          ) : (
            <MapIcon className="w-auto h-7" />
          )}
        </Link>
      </nav>
    </footer>
  );
}
