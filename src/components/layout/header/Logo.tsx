"use client"
import Link from "next/link";
import logoImg from "../../../../public/logo.png";
import Image from "next/image";

export default function Logo() {
  return (
    <Link
      href="/"
      prefetch
      className={`relative flex items-center justify-center cursor-pointer sm:space-x-4`}
    >
      <Image src={logoImg} alt="Logo" className={`h-6  w-auto sm:h-10`} />
      <h1
        className={`hidden  text-gray-800 text-base md:text-2xl font-bold italic sm:inline-flex`}
      >
        Hanap-BH
      </h1>
    </Link>
  );
}
