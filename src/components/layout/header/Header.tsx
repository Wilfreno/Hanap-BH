"use client";
import Logo from "./logo/Logo";
import AddPlace from "./add-place/AddPlace";
import Menu from "./menu/Menu";
import Search from "./search/Search";

export default function Header() {
  return (
    <header className="flex items-center m-5 bg-transparent sm:bg-background sm:m-0 sm:border-b sm:py-1 md:py-2 md:px-10 justify-evenly sm:justify-between">
      <Logo />
      <Search />
      <AddPlace />
      <Menu />
    </header>
  );
}
