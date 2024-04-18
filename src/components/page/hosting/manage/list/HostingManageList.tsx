"use client";

import { useSession } from "next-auth/react";
import HostingListManageItems from "./items/HostingManageListItems";

export default function HostingManageList() {
  const { data } = useSession();

  return (
    <div className="px-5 space-y-1">
      {data?.user.lodgings!.length! > 0 ? (
        data?.user.lodgings!.map((lodging) => (
          <HostingListManageItems key={lodging.id} lodging={lodging} />
        ))
      ) : (
        <p className="text-sm text-muted-foreground self-center text-center">
          You currently dont have any lodging registered
        </p>
      )}
    </div>
  );
}
