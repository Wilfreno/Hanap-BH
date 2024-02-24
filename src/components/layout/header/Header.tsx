"use client";
import Logo from "./logo/Logo";
import AddPlace from "./add-place/AddPlace";
import Menu from "./menu/Menu";
import Search from "./view/search/Search";
import View from "./view/View";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function Header() {
  const [width, setwidth] = useState<number>(window.innerWidth);
  const search_params = useSearchParams();
  const view = search_params.get("view");
  useEffect(() => {
    function handleResize() {
      setwidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <header className="sticky top-0 w-full bg-background sm:px-5 sm:py-2 border-b z-50">
      {width >= 640 ? (
        <div className="flex items-center my-auto">
          <Logo />
          <View />
          <AddPlace />
          <Menu />
        </div>
      ) : (
        <div className="w-full">
          <div className="w-full flex items-center justify-between p-3 px-5">
            <Logo />
            <Menu />
          </div>
          <View />
        </div>
      )}
      {view === "search" && <Search />}
    </header>
  );
}
