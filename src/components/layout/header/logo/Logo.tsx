"use client";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LogoImg = dynamic(
  () => import("@/components/layout/header/logo/LogoImg"),
  { ssr: false }
);
export default function Logo() {
  const path_name = usePathname();
  return (
    <Link
      href="/"
      prefetch
      className="items-center hidden space-x-2 mr-5 md:mx-0 sm:flex md:space-x-5 whitespace-nowrap"
    >
      <LogoImg />
      <h1
        className={cn(
          " text-xl md:text-3xl italic font-bold",
          path_name.startsWith("/map") && "text-background"
        )}
      >
        Hanap-BH
      </h1>
    </Link>
  );
}
