"use client";
import dynamic from "next/dynamic";
import Link from "next/link";

const LogoImg = dynamic(
  () => import("@/components/layout/header/logo/LogoImg"),
  { ssr: false }
);

export default function Logo() {
  return (
    <Link
      href="/"
      prefetch
      className="flex items-center space-x-2 md:space-x-5 whitespace-nowrap"
    >
      <span className="hidden sm:inline-flex">
        <LogoImg />
      </span>
      <h1 className="text-xl md:text-2xl italic font-bold">Hanap-BH</h1>
    </Link>
  );
}
