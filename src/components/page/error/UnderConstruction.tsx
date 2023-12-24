import { HomeIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function UnderConstruction() {
  return (
    <section className="flex items-center justify-center h-screen w-full text-gray-900">
      <div className="flex flex-col items-center">
        <WrenchScrewdriverIcon className="h-10" />
        <p>
          This page is stil under development and is unavailable as this moment
          please go back to{" "}
          <Link
            href={"/"}
            className="underline text-blue-700 hover:text-blue-500"
          >
            {" "}
            hompage
          </Link>
        </p>
      </div>
    </section>
  );
}
