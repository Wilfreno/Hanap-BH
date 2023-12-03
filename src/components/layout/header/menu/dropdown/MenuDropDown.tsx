import NotLoggedInDropDown from "./NotLoggedInDropDown";
import LoggedInDropDown from "./LoggedInDropDown";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function MenuDropDown() {
  const session = useSession();
  const section_ref = useRef<HTMLTableSectionElement>(null);
  const path_name = usePathname();
  const router = useRouter();

  useEffect(() => {
    function clickHandler(e: MouseEvent) {
      if (!section_ref.current?.contains(e.target as Node)) {
        router.replace(path_name);
      }
    }
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, []);
  return (
    <section className="hidden fixed bg-white rounded-lg z-20 top-[9vh] sm:flex flex-col border-2 w-[18rem] text-gray-700 text-sm font-medium sm:right-4 sm:shadow-lg mt-1 md:right-8 lg:right-8 ">
      {session.status === "authenticated" ? (
        <LoggedInDropDown />
      ) : (
        <NotLoggedInDropDown />
      )}
    </section>
  );
}
