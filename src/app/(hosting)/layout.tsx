"use client";
import Logo from "@/components/layout/header/logo/Logo";
import Menu from "@/components/layout/header/menu/Menu";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="flex items-center justify-between px-10 sticky top-0 w-full bg-background sm:px-10 sm:py-3 border-b z-50">
        <Logo>
          <sub className="italic text-xs text-muted-foreground">Hosting</sub>
        </Logo>
        <Menu />
      </header>
      {children}
    </>
  );
}
