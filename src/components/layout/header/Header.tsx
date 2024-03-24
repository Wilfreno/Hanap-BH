"use client";
import Logo from "./logo/Logo";
import AddPlace from "./add-place/AddPlace";
import Menu from "./menu/Menu";
import { useEffect, useState } from "react";
import HeaderNavigation from "./HeaderNavigation";

export default function Header() {
  const [width, setwidth] = useState<number>();
  useEffect(() => {
    setwidth(window.innerWidth);

    function handleResize() {
      setwidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <header className="w-full bg-background sm:px-10 sm:py-2 z-40">
      {width! < 640 ? (
        <div className="w-full">
          <div className="w-full flex items-center justify-between p-3 px-5">
            <Logo />
            <Menu />
          </div>
          <HeaderNavigation />
        </div>
      ) : (
        <div className="flex items-center my-auto">
          <Logo />
          <HeaderNavigation />
          <AddPlace />
          <Menu />
        </div>
      )}
    </header>
  );
}
