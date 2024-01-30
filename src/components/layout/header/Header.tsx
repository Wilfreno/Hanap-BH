"use client";
import Fullscreen from "./Fullscreen";
import Logo from "./Logo";
import AddPlace from "./add-place/AddPlace";
import Menu from "./menu/Menu";
import Search from "./search/Search";

export default function Header() {
  return (
    <header className="flex items-center p-5 sm:border-b sm:py-1 md:py-2 md:px-10 justify-evenly sm:justify-between">
      <Logo />
      <Search />
      <AddPlace />
      <Menu />
    </header>
  );
}
