import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import MenuContent from "./MenuContent";
export default function zMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full ml-5 md:ml-0">
        <Avatar className="aspect-square relative overflow-hidden h-10 w-auto ">
          <AvatarImage>
            <Image src={""} alt="user" className="object-fit w-full h-full" />
          </AvatarImage>
          <AvatarFallback className="border">
            <UserIcon className="w-auto h-2/3 stroke-1" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <MenuContent />
    </DropdownMenu>
  );
}
