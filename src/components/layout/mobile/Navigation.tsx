"use client";
import {
  MapIcon,
  QueueListIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navigation() {
  const path_name = usePathname();
  const [on_mobile, setOnMobile] = useState(false);
  const router = useRouter();
  const [page_width, setPageWidth] = useState(0);

  useEffect(() => {
    function resizeHandler() {
      router.refresh();
      setPageWidth(window.innerWidth);
    }
    setPageWidth(window.innerWidth);
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return page_width < 604 ? (
    <footer className="fixed bottom-0 w-full h-[10vh] flex items-center justify-center space-x-10 border-2  rounded-t-md p-2 z-10 bg-white sm:hidden">
      <Link
        className={`hover:bg-gray-200 rounded-lg flex flex-col items-center justify-center ${
          path_name === "/" ? "bg:gray-200" : ""
        }`}
        href="/"
        prefetch
      >
        <QueueListIcon
          className={`h-8 m-1 mx-5 ${
            path_name === "/" ? "text-gray-900" : "text-gray-500"
          }`}
        />
        <p className="text-xs text-gray-700">List</p>
      </Link>
      <Link
        className={`hover:bg-gray-200 rounded-lg flex flex-col items-center justify-center ${
          path_name === "/map" ? "bg:gray-200" : ""
        }`}
        href="/map"
        prefetch
      >
        <MapIcon
          className={`h-8 m-1 mx-5 ${
            path_name === "/map" ? "text-gray-900" : "text-gray-500"
          }`}
        />
        <p className="text-xs text-gray-700">Map</p>
      </Link>
      <Link
        className={`hover:bg-gray-200 rounded-lg flex flex-col items-center justify-center ${
          path_name === "/log-in" ? "bg:gray-200" : ""
        }`}
        href="/log-in"
        prefetch
      >
        <UserCircleIcon className={`h-8 m-1 mx-5 text-gray-500`} />
        <p className="text-xs text-gray-700">Log in</p>
      </Link>
    </footer>
  ) : null;
}
