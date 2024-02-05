"use client";

import { cn } from "@/lib/utils";
import { MapIcon, QueueListIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const path_name = usePathname();
  return (
    <footer className="fixed bottom-0 bg-background sm:hidden">
      <nav className="w-screen flex justify-evenly items-center">
        <Link
          href="/"
          prefetch
          className={cn(
            " py-3  grow flex justify-center",
            path_name === "/" ? " bg-muted" : ""
          )}
        >
          <QueueListIcon className="w-auto h-7" />
        </Link>
        <Link
          href="/hosting"
          prefetch
          className={cn(
            " py-3  grow flex justify-center",
            path_name === "/hosting" ? " bg-muted" : ""
          )}
        >
          <PlusIcon className="w-auto h-6" />
        </Link>
        <Link
          href="/map"
          prefetch
          className={cn(
            " py-3  grow flex justify-center",
            path_name === "/map" ? " bg-muted" : ""
          )}
        >
          <MapIcon className="w-auto h-7" />
        </Link>
      </nav>
    </footer>
  );
}
