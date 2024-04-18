"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function HostingManageConent() {
  const { data } = useSession();

  if (data?.user.lodgings)
    redirect(`/hosting/manage/${data.user.lodgings[0].id}`);

  return <section>page</section>;
}
