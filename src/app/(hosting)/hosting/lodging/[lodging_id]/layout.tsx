import LogoImg from "@/components/layout/header/logo/LogoImg";
import Menu from "@/components/layout/header/menu/Menu";
import HostingLodgingNavigation from "@/components/page/hosting/lodging/HostingLodgingNavigation";
import Link from "next/link";
import React from "react";
import { getLodging } from "./page";

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lodging_id: string };
}) {
  const lodging = await getLodging(params.lodging_id);

  return (
    <>
      <header className="border-b px-5 pt-5 space-y-10">
        <div className="flex justify-between ">
          <nav className="flex items-center space-x-5">
            <Link href="/">
              <LogoImg />
            </Link>
            <span className="text-2xl text-muted">/</span>
            <Link href="/hosting">
              <h1 className="text-lg italic font-bold">
                Hanap-BH
                <sub className="italic text-xs text-muted-foreground">
                  Hosting
                </sub>
              </h1>
            </Link>
            <span className="text-2xl text-muted">/</span>
            <Link
              href={`/hosting/lodging/${params.lodging_id}`}
              className="font-semibold"
            >
              {lodging.name}
            </Link>
          </nav>
          <Menu />
        </div>
        <HostingLodgingNavigation lodging_id={params.lodging_id} />
      </header>
      {children}
    </>
  );
}
