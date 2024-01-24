"use client";
import Link from "next/link";
import logoDark from "../../../../public/logo/hanap-bh-dark.png";
import logoLight from "../../../../public/logo/hanap-bh-light.png";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Logo() {
  const { theme } = useTheme();
  return (
    <Link href="/" prefetch className="items-center hidden md:flex space-x-5">
      <Image
        src={theme === "light" ? logoLight : logoDark}
        alt="Logo"
        className={`h-5  w-auto sm:h-10`}
        priority
      />
      <h1 className="text-3xl italic font-bold">Hanap-BH</h1>
    </Link>
  );
}
