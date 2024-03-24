import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthenticatedMenu() {
  const { data } = useSession();
  return (
    <>
      <Link
        href={`/user/${data?.user.auth.name}`}
        as={`/user/${data?.user.auth.name}`}
      >
        <DropdownMenuItem className="flex cursor-pointer">
          <Avatar>
            <AvatarImage
              src={data?.user.profile_pic!}
              fetchPriority="high"
              alt={data!.user.first_name.charAt(0).toUpperCase()}
            />
            <AvatarFallback className="group-hover:bg-background font-bold">
              {data!.user.first_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="text-base font-semibold mx-auto">
            {data?.user.first_name.charAt(0).toUpperCase()! +
              data?.user.first_name.slice(1)}{" "}
            {data?.user.last_name.charAt(0).toUpperCase()! +
              data?.user.last_name.slice(1)}
          </p>
        </DropdownMenuItem>
      </Link>
    </>
  );
}
