"use client";
import Logo from "@/components/layout/header/logo/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HostingSideNavBar() {
  const path_name = usePathname();

  const items = [
    { name: "Lodging", link: "/hosting/new" },
    { name: "Rooms", link: "/hosting/room" },
  ];
  return (
    <nav className="flex flex-col w-[15vw]">
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.link}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            path_name === item.link
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start font-bold"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
