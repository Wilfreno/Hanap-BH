"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center justify-center w-screen overflow-hidden md:h-screen">
      {children}
    </main>
  );
}
