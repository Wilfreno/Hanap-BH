import { Separator } from "@/components/ui/separator";
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
  const view_list = [
    {
      name: "Nearby",
      link: "nearby",
      icon: <ListBulletIcon className="h-6 w-auto stroke-[2px]" />,
    },
    {
      name: "Search",
      link: "search",
      icon: <MagnifyingGlassIcon className="h-6 w-auto stroke-[2px]" />,
    },
    {
      name: "Browse",
      link: "browse",
      icon: <GlobeAltIcon className="h-6 w-auto stroke-[2px]" />,
    },
    {
      name: "Map",
      link: "map",
      icon: <MapIcon className="h-6 w-auto stroke-[2px]" />,
    },
  ];

  useEffect(() => {
    setwidth(window.innerWidth);

    function handleResize() {
      setwidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <nav className="flex items-center sm:justify-center sm:grow sm:mx-auto sm:space-x-10 font-semibold text-base text-muted-foreground sm:pl-16">
      {view_list.map((l, index) => (
        <Link
          key={l.name}
          href={`/${l.link}`}
          as={`/${l.link}`}
          className={cn(
            "grow sm:grow-0 flex items-center justify-center p-2 py-3 sm:p-0 sm:py-0",
            path_name.endsWith(l.link) && "text-primary"
          )}
        >
          {width! < 640 ? l.icon : l.name}
        </Link>
      ))}
    </nav>
  );
}
