"use client";
import Fullscreen from "./Fullscreen";
import Logo from "./Logo";
import AddPlace from "./add-place/AddPlace";
import Menu from "./menu/Menu";
import Search from "./search/Search";

export default function Header() {
  return (
    <header className="flex items-center p-5 md:border-b md:py-2 md:px-10 justify-evenly md:justify-between">
      <Logo />
      <Search />
      <AddPlace />
      <Menu />
    </header>
  );
}
