"use client";
import Link from "next/link";
import logoImg from "../../../../public/logo.png";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" prefetch className="items-center hidden md:flex">
      <Image
        src={logoImg}
        alt="Logo"
        className={`h-6  w-auto sm:h-10`}
        priority
      />
      <h1 className="text-2xl italic font-bold">Hanap-BH</h1>
    </Link>
  );
}
