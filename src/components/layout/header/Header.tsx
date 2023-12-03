"use client";
import Logo from "./Logo";
import AddPlace from "./add-place/AddPlace";
import Search from "./search/Search";
import Menu from "./menu/Menu";

export default function Header() {
  return (
    <header className="fixed w-screen my-5 top-0 z-10 flex items-center justify-center bg-transparent sm:shadow-md sm:bg-white sm:w-screen sm:my-0 sm:rounded-none md:mx-0">
      <div className="relative flex items-center justify-center border-2 rounded-full px-3 py-1 bg-white shadow-md sm:border-none sm:shadow-none sm:w-full sm:justify-between sm:px-5 lg:px-8 ">
        <Logo />
        <Search />
        <div
          className={`flex relative items-center justify-center md:justify-end  text-gray-500 sm:justify-evenly sm:space-x-5`}
        >
          <AddPlace />
          <Menu />
        </div>
      </div>
    </header>
  );
}
