"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HostingNavigation() {
  const links = [{ name: "Overview", url: "/hosting" }];
  const path_name = usePathname();
  return (
    <nav>
      {links.map((link) => (
        <Link key={link.name} href={link.url}>
          <Button
            variant="ghost"
            className={cn(
              "text-base",
              path_name.endsWith(link.url) &&
                "underline decoration-primary decoration-2 underline-offset-8"
            )}
          >
            {link.name}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
