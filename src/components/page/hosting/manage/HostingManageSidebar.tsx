"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AddLodging from "./HostingManageAddLodging";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function HostingManageSideBar() {
  const { data } = useSession();

  return (
    <div className="grid grid-rows-[auto_1fr] w-[25vw]">
      <div className="flex items-center justify-between pl-5">
        <p className="text-base font-bold">Lodgings</p>
        <AddLodging>
          <Button
            type="button"
            size="sm"
            className=" focus-visible:ring-0 justify-start font-bold space-x-3 p-1"
          >
            <p className="mx-auto font-bold">Add</p>
            <PlusIcon className="h-4 stroke-2" />
          </Button>
        </AddLodging>
      </div>
      <div className="space-y-3 my-5 ">
        {data?.user.lodgings!.length! > 0 ? (
          <div className="grid">
            {data?.user.lodgings!.map((lodging) => (
              <Link
                href={`/hosting/manage/${lodging.id}`}
                key={lodging.id}
                className="justify-self-end w-[90%]"
              >
                <Button className="w-full justify-start" variant="ghost">
                  {lodging.name}
                </Button>
              </Link>
            ))}
            <Separator className="my-5 w-[90%] justify-self-center" />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground self-center text-center my-20">
            You currently dont have any lodging registered
          </p>
        )}
      </div>
    </div>
  );
}
