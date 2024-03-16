"use client";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LogoImg = dynamic(
  () => import("@/components/layout/header/logo/LogoImg"),
  { ssr: false }
);
export default function Logo({ children }: { children?: React.ReactNode }) {
  const path_name = usePathname();
  return (
    <Link
      href={path_name.startsWith("/hosting") ? "/hosting" : "/"}
      prefetch
      className="flex items-center space-x-2 md:space-x-5 whitespace-nowrap"
    >
      <span className="hidden sm:inline-flex">
        <LogoImg />
      </span>
      <h1 className={cn("text-xl md:text-2xl italic font-bold")}>
        Hanap-BH {children}
      </h1>
    </Link>
  );
}
