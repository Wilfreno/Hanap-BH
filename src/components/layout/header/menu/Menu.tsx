import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "@heroicons/react/24/outline";
import MenuContent from "./menu-content/MenuContent";
import { useSession } from "next-auth/react";



export default function Menu() {
  const { data, status } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Avatar className="h-9 w-auto">
          {status === "authenticated" && (
            <AvatarImage
              src={data?.user.photo?.photo_url}
              fetchPriority="high"
              alt={data.user.first_name?.charAt(0).toUpperCase()}
            />
          )}
          <AvatarFallback className="group-hover:bg-background font-bold w-9 h-9">
            {status === "authenticated" ? (
              data.user.first_name?.charAt(0).toUpperCase()
            ) : (
              <UserIcon className="h-1/2 w-auto stroke-1" />
            )}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <MenuContent />
    </DropdownMenu>
  );
}
