import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/solid";
import MenuDropDown from "./dropdown/MenuDropDown";
import { useEffect, useRef, useState } from "react";
export default function Menu() {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function clickHandler(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        setActive(false);
      }
    }
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, []);
  return (
    <>
      <div
        className={`hidden sm:flex items-center rounded-full p-1 cursor-pointer text-gray-700 hover:shadow-lg sm:space-x-2 sm:border ${
          active ? "shadow-lg border-gray-300" : ""
        }`}
        ref={ref}
        onClick={() => setActive((prev) => !prev)}
      >
        <Bars3Icon className="h-5 md:h-6 sm:inline-flex" />
        <UserCircleIcon className={`h-[2rem] md:h-[2.3rem]`} />
      </div>
      {active ? <MenuDropDown /> : null}
    </>
  );
}
