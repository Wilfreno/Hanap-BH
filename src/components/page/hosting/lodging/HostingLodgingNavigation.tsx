"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HostingLodgingNavigation({
  lodging_id,
}: {
  lodging_id: string;
}) {
  const path_name = usePathname();
  const links = [
    { name: "Lodging", url: `/hosting/lodging/${lodging_id}` },
    { name: "Rooms", url: `/hosting/lodging/${lodging_id}/rooms` },
    { name: "Settings", url: `/hosting/lodging/${lodging_id}/settings` },
  ];
  return (
    <nav className="space-x-5">
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
