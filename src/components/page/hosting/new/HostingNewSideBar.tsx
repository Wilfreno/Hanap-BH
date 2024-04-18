"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function HostingNewSideBar() {
  const { data } = useSession();

  return (
    <div className="w-[20vw]">
      <Button></Button>
    </div>
  );
}
