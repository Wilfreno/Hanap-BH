"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function page() {
  const { status, data } = useSession();
  console.log(data);
  return (
    status === "authenticated" && (
      <Button className="my-auto mx-auto" onClick={() => signOut()}>
        Logout
      </Button>
    )
  );
}
