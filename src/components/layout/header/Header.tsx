"use client";
import Logo from "./logo/Logo";
import AddPlace from "./add-place/AddPlace";
import Menu from "./menu/Menu";
import { useEffect, useState } from "react";
import HeaderNavigation from "./HeaderNavigation";

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-background sm:px-10 sm:py-2 z-40 shadow-md">
      <>
        <div className="w-full sm:hidden">
          <div className="w-full flex items-center justify-between p-3 px-5">
            <Logo />
            <Menu />
          </div>
          <HeaderNavigation />
        </div>
        <div className="hidden sm:flex items-center my-auto">
          <Logo />
          <HeaderNavigation />
          <AddPlace />
          <Menu />
        </div>
      </>
    </header>
  );
}
