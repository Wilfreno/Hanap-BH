"use client";

import AddLodging from "@/components/page/hosting/manage/HostingManageAddLodging";
import HostingManageSideBar from "@/components/page/hosting/manage/HostingManageSidebar";
import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";
export default function page() {
  const { data, update } = useSession();

  console.log(data);
  return (
    <>
      <HostingManageSideBar />
      <section className="fl">
        {data?.user.lodgings?.length! > 0 ? (
          ""
        ) : (
          <section className="place-self-center grid place-items-center space-y-5">
            <p className="text-sm text-muted-foreground">
              Add your lodging now for every on to see
            </p>
            <AddLodging>
              <Button type="button" className="focus-visible:ring-0 font-bold">
                <p className="mx-auto">Add</p>
              </Button>
            </AddLodging>
          </section>
        )}
      </section>
    </>
  );
}
