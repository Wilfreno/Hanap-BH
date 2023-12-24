import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function MapNavigation({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className: string;
}) {
  const search_params = useSearchParams();
  const lat = search_params.get("lat");
  const lng = search_params.get("lng");
  const open_menu = search_params.get("open_menu");
  return (
    <Link
      href={`${href}?${lat && `lat=${lat}`}${lng && `&lng=${lng}`}${
        open_menu && `&open_menu=${open_menu}`
      }`}
      as={`${href}?${lat && `lat=${lat}`}${lng && `&lng=${lng}`}${
        open_menu && `&open_menu=${open_menu}`
      }`}
      className={className}
    >
      {children}
    </Link>
  );
}
