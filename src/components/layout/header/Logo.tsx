"use client";
import Link from "next/link";
import logoDark from "../../../../public/logo/hanap-bh-dark.png";
import logoLight from "../../../../public/logo/hanap-bh-light.png";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Logo() {
  const { theme } = useTheme();
  return (
    <Link
      href="/"
      prefetch
      className="items-center hidden space-x-2 mr-5 md:mx-0 sm:flex md:space-x-5 whitespace-nowrap"
    >
      <Image
        src={theme === "light" ? logoLight : logoDark}
        alt="Logo"
        className="h-8  w-auto md:h-10"
        priority
      />
      <h1 className=" text-xl md:text-3xl italic font-bold">Hanap-BH</h1>
    </Link>
  );
}
