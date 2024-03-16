"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function layout({ children }: { children: React.ReactNode }) {
  const path_name = usePathname();
  const searchParams = useSearchParams();
  const cb = searchParams.get("callbackUrl");
  const router = useRouter();
  if (cb) router.replace(`${path_name}?url_callback=${cb}`);
  
  return (
    <main className="flex items-center justify-center w-screen overflow-hidden md:h-screen">
      {children}
    </main>
  );
}
