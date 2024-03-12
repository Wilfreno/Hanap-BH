"use client";
import Logo from "@/components/layout/header/logo/Logo";
import Menu from "@/components/layout/header/menu/Menu";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="flex items-center justify-between px-10 sticky top-0 w-full bg-background sm:px-10 sm:py-3 border-b z-50">
        <span className="flex">
          <Logo />
          <h2 className="italic text-muted-foreground text-xs place-self-end px-2">
            Hosting
          </h2>
        </span>
        <Menu />
      </header>
      {children}
    </>
  );
}
