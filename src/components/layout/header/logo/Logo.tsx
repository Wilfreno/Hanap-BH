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
      className="items-center hidden space-x-2 mr-5 md:mx-0 sm:flex md:space-x-5 whitespace-nowrap"
    >
      <LogoImg />
      <h1 className=" text-xl md:text-3xl italic font-bold">Hanap-BH</h1>
    </Link>
  );
}
