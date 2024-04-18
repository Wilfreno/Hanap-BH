"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function HostingManageLodgingSidebar({ id }: { id: string }) {
  const { data } = useSession();
  const router = useRouter();
  const path_name = usePathname();
  const lodging: LodgingDetailsType = data?.user.lodgings?.find(
    (lodging) => lodging.id === id
  );

  return (
    <section className="w-[25vw] space-y-5 px-5">
      <Link href="/hosting/manage">
        <Button variant="link" className="font-bold justify-start p-0">
          <ChevronLeftIcon className="h-4 mr-3" />
          Go back
        </Button>
      </Link>
      <p className="text-base turnicate font-semibold">{lodging?.name}</p>
      <Separator className="my-5  mx-auto" />
      <p className=" text-xs font-bold flex items-center justify-between">
        rooms
        <Button
          type="button"
          variant="ghost"
          className="p-1 aspect-square w-auto h-fit"
          size="sm"
        >
          <PlusIcon className="h-3" />
        </Button>
      </p>
      <div className="sapce-x-3">
        {lodging.rooms?.map((room) => (
          <Button
            variant="ghost"
            onClick={() => router.push(`${path_name}?${room.id}`)}
          ></Button>
        ))}
      </div>
    </section>
  );
}
