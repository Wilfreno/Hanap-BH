"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  MapIcon,
  QueueListIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Navigation() {
  return (
    <footer className="fixed bottom-0 py-3 border-t md:hidden">
      <NavigationMenu>
        <NavigationMenuList className="flex justify-evenly w-[100vw]">
          <NavigationMenuItem className="grow">
            <Link
              href="/"
              prefetch
              className="flex items-center justify-center"
            >
              <QueueListIcon className="w-auto h-8" />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className=" grow">
            <Link
              href="/map"
              className="flex items-center justify-center"
              prefetch
            >
              <MapIcon className="w-auto h-8" />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className=" grow">
            <Link
              href="/log-in"
              className="flex items-center justify-center"
              prefetch
            >
              <PlusIcon className="w-auto h-8" />
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </footer>
  );
}
