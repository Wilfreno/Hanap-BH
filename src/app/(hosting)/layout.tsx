import HostingHeader from "@/components/layout/header/HostingHeader";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HostingHeader />
      {children}
    </>
  );
}
