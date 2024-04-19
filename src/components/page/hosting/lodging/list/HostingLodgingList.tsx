"use client";

import CustomImage from "@/components/CustomImage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

export default function HostingLodgingList() {
  const { data } = useSession();

  return (
    <div className="flex space-x-5 p-5 px-10 h-fit">
      {data?.user.lodgings!.map((lodging) => (
        <Card
          key={lodging.id}
          className="hover:bg-muted hover:cursor-pointer w-[25vw]"
        >
          <CardHeader>
            <CardTitle className="flex justify-between">
              {lodging.name}
              <div className="flex items-center">
                <span className="text-xs font-bold mx-1">300</span>
                <HeartIcon className="h-5 fill-red-500 stroke-red-500" />
              </div>
            </CardTitle>
            <CardDescription>{lodging.address}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg overflow-hidden aspect-video w-full">
              <CustomImage
                url={lodging.photos?.[0]?.photo_url}
                database={lodging.database}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
