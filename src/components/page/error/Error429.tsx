"use client";
import Image from "next/image";
import errorSVG from "../../../../public/laptop-exclamation-alt-svgrepo-com.svg";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
export default function Error429() {
  const path_name = usePathname();
  const router = useRouter();
  return (
    <main>
      <section className="h-screen w-screen flex flex-col items-center justify-center space-y-5">
        <div className="relative aspect-square h-10 w-auto lg:h-20">
          <Image src={errorSVG} alt="Error.." className="object-contai" />
        </div>
        <div className="flex flex-col items-center justify-center text-lg">
          <p>The server is busy for the moment</p>
          <p>try to reload after a minute</p>
          <Link
            href={path_name}
            as={path_name}
            prefetch
            className="flex items-center justify-center p-2 border text-white bg-gray-900 rounded-lg text-base my-3 hover:scale-105 transition transform duration-200 ease-in-out"
          >
            Reload
            <ArrowPathIcon className="h-4 ml-2" />
          </Link>
        </div>
      </section>
    </main>
  );
}
