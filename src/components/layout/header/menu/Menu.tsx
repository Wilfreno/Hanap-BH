import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import MenuContent from "./menu-content/MenuContent";
import { useSession } from "next-auth/react";
export default function zMenu() {
  const { data, status } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full ml-5 md:ml-0">
        <Avatar>
          {status === "authenticated" && (
            <AvatarImage
              src={data?.user!.profile_pic!}
              fetchPriority="high"
              alt={data!.user.first_name.charAt(0).toUpperCase()}
            />
          )}
          <AvatarFallback className="group-hover:bg-background font-bold">
            {status === "authenticated" ? (
              data.user.first_name.charAt(0).toUpperCase()
            ) : (
              <UserIcon className="w-auto h-2/3 stroke-1" />
            )}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <MenuContent />
    </DropdownMenu>
  );
}
