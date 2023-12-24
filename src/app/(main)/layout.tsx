"use client";
import MainHeader from "@/components/layout/header/MainHeader";
import Navigation from "@/components/layout/mobile/Navigation";
import { useSelectedLayoutSegment } from "next/navigation";

export default function layout({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <>
      <MainHeader />
      <main>
        {children}
        {auth}
      </main>
      <Navigation />
    </>
  );
}
