import Image from "next/image";
import errorSVG from "../../../../public/laptop-exclamation-alt-svgrepo-com.svg";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";
export default function Error503() {
  const path_name = usePathname();
  const router = useRouter();
  return (
    <main>
      <section className="h-screen w-screen flex flex-col items-center justify-center dark:text-white space-y-5">
        <div className="relative aspect-square h-10 w-auto lg:h-20">
          <Image src={errorSVG} alt="Error.." className="object-contai" />
        </div>
        <div className="flex flex-col items-center justify-center text-lg">
          <p>The server is busy for the moment</p>
          <p>try to reload after a minute</p>
          <button
            onClick={() => router.push(path_name)}
            className="flex items-center justify-center space-x-2 p-2 border text-white bg-gray-900 rounded-lg text-base my-3 hover:scale-105 transition transform duration-200 ease-in-out"
          >
            Reload
            <ArrowPathIcon className="h-4" />
          </button>
        </div>
      </section>
    </main>
  );
}
